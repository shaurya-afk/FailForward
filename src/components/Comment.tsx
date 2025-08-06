import { Comment as CommentType } from '@/types/comment';
import { Trash2, User, EyeOff } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { deleteComment } from '@/data/api';
import { useState } from 'react';

interface CommentProps {
  comment: CommentType;
  onDelete?: () => void;
}

export default function Comment({ comment, onDelete }: CommentProps) {
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const canDelete = user?.id === comment.userId;

  const handleDelete = async () => {
    if (!user?.id || !canDelete) return;

    setIsDeleting(true);
    try {
      await deleteComment(comment.id, user.id);
      onDelete?.();
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            {comment.isAnonymous ? (
              <EyeOff className="w-4 h-4 text-white" />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {comment.displayName}
            </span>
            <span className="text-xs text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>

        {canDelete && (
          <div className="relative">
            <button
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              disabled={isDeleting}
              className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
              title="Delete comment"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {showDeleteConfirm && (
              <div className="absolute right-0 top-8 bg-red-500/90 backdrop-blur-sm rounded-lg p-3 border border-red-400/50 z-10 min-w-[200px]">
                <p className="text-white text-sm mb-3">Delete this comment?</p>
                <div className="flex space-x-2">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors duration-200 disabled:opacity-50"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-gray-200 leading-relaxed">
        {comment.content}
      </div>
    </div>
  );
} 