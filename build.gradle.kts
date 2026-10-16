tasks.register<Exec>("assembleDebug") {
    commandLine("python3", "scripts/build_artifacts.py")
}

tasks.register<Exec>("lint") {
    commandLine("npm", "run", "lint")
}
