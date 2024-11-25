import { X } from 'lucide-react';

export function ProductUpdateModal({ children, edit, onClose }) {
  if (!edit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl">
        {/* Modal Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 
                   transition-colors duration-200 p-2 rounded-full 
                   hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}