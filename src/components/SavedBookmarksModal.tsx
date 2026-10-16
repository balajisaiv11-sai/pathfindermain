import React from 'react';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';

interface SavedItem {
  id: string;
  title: string;
  type: 'stream' | 'career' | 'exam';
}

interface SavedBookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: SavedItem[];
  onRemoveBookmark: (id: string) => void;
  onSelectBookmark: (item: SavedItem) => void;
}

export const SavedBookmarksModal: React.FC<SavedBookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onSelectBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-stone-200 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="text-lg font-display font-bold text-stone-900">
              Saved Pathways & Exams ({bookmarks.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-2.5">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs sm:text-sm">
              <Bookmark className="w-8 h-8 mx-auto text-stone-300 mb-2" />
              <p>You haven\'t bookmarked any streams or exams yet.</p>
              <p className="text-[11px] text-stone-400 mt-1">
                Click the bookmark icon on any stream, degree, or exam card to save it here for quick access.
              </p>
            </div>
          ) : (
            bookmarks.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-400/80 transition-all text-xs"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-0.5">
                    {b.type}
                  </span>
                  <div className="font-bold text-stone-900 text-sm">{b.title}</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onSelectBookmark(b);
                      onClose();
                    }}
                    className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                    title="View Item"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(b.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-stone-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
