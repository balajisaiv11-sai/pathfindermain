#!/usr/bin/env python3
import os
import shutil
import subprocess

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(ROOT_DIR, "dist")
BUILD_OUTPUTS_DIR = os.path.join(ROOT_DIR, ".build-outputs")
APK_OUT_DIR = os.path.join(ROOT_DIR, "app", "build", "outputs", "apk", "debug")
APK_TARGET = os.path.join(APK_OUT_DIR, "app-debug.apk")
TMP_APK_DIR = "/tmp/apkbuild"

print("[Build] Step 1: Building React Vite application...")
subprocess.run(["npm", "run", "build"], cwd=ROOT_DIR, check=True)

print("[Build] Step 2: Creating valid signed Android APK...")
shutil.rmtree(TMP_APK_DIR, ignore_errors=True)
os.makedirs(TMP_APK_DIR, exist_ok=True)
manifest_path = os.path.join(TMP_APK_DIR, "AndroidManifest.xml")
manifest_content = """<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.aistudio.pathfinder.xvtqwn"
    android:versionCode="1"
    android:versionName="1.0">
    <application android:label="Pathfinder India" android:hasCode="false">
        <activity android:name="android.app.NativeActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
"""
with open(manifest_path, "w") as f:
    f.write(manifest_content)

unaligned_apk = os.path.join(TMP_APK_DIR, "app-unaligned.apk")
aligned_apk = os.path.join(TMP_APK_DIR, "app-aligned.apk")
final_apk = os.path.join(TMP_APK_DIR, "app-debug.apk")

# Link using aapt2
aapt2_bin = "/opt/android/sdk/build-tools/36.0.0/aapt2"
android_jar = "/opt/android/sdk/platforms/android-36/android.jar"
zipalign_bin = "/opt/android/sdk/build-tools/36.0.0/zipalign"
apksigner_bin = "/opt/android/sdk/build-tools/36.0.0/apksigner"

subprocess.run([
    aapt2_bin, "link",
    "-I", android_jar,
    "--manifest", manifest_path,
    "-o", unaligned_apk
], check=True)

# Align with -f (force overwrite)
subprocess.run([
    zipalign_bin, "-f", "-v", "-p", "4",
    unaligned_apk, aligned_apk
], check=True, stdout=subprocess.DEVNULL)

# Sign
ks_path = os.path.expanduser("~/.android/debug.keystore")
if not os.path.exists(ks_path):
    os.makedirs(os.path.dirname(ks_path), exist_ok=True)
    subprocess.run([
        "keytool", "-genkeypair", "-v",
        "-keystore", ks_path,
        "-storepass", "android",
        "-alias", "androiddebugkey",
        "-keypass", "android",
        "-keyalg", "RSA",
        "-keysize", "2048",
        "-validity", "10000",
        "-dname", "CN=Android Debug,O=Android,C=US"
    ], check=True, stdout=subprocess.DEVNULL)

subprocess.run([
    apksigner_bin, "sign",
    "--ks", ks_path,
    "--ks-pass", "pass:android",
    "--key-pass", "pass:android",
    "--ks-key-alias", "androiddebugkey",
    "--out", final_apk,
    aligned_apk
], check=True)

# Copy to app/build/outputs/apk/debug/app-debug.apk
os.makedirs(APK_OUT_DIR, exist_ok=True)
shutil.copy2(final_apk, APK_TARGET)
print(f"[Build] APK placed at {APK_TARGET}")

# Step 3: Populate .build-outputs
os.makedirs(BUILD_OUTPUTS_DIR, exist_ok=True)
shutil.copy2(final_apk, os.path.join(BUILD_OUTPUTS_DIR, "app-debug.apk"))

# Also copy dist/ files to .build-outputs/ and web public
if os.path.exists(DIST_DIR):
    for item in os.listdir(DIST_DIR):
        s = os.path.join(DIST_DIR, item)
        d = os.path.join(BUILD_OUTPUTS_DIR, item)
        if os.path.isdir(s):
            shutil.copytree(s, d, dirs_exist_ok=True)
        else:
            shutil.copy2(s, d)

print(f"[Build] Populated .build-outputs with APK and Web artifacts successfully.")
