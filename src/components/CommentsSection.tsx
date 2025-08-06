import { useState, useEffect } from 'react';
import { Comment as CommentType } from '@/types/comment';
import { getCommentsByStoryId } from '@/data/api';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { MessageCircle, Loader2 } from 'lucide-react';

interface CommentsSectionProps {
  storyId: number;
  initialCommentCount?: number;
}

export default function CommentsSection({ storyId, initialCommentCount = 0 }: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedComments = await getCommentsByStoryId(storyId);
      setComments(fetchedComments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [storyId]);

  const handleCommentAdded = () => {
    // Refresh comments after adding a new one
    fetchComments();
  };

  const handleCommentDeleted = () => {
    // Refresh comments after deleting one
    fetchComments();
  };

  return (
    <div className="space-y-6">
      {/* Comments Header */}
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <CommentForm storyId={storyId} onCommentAdded={handleCommentAdded} />

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
            <span className="ml-2 text-gray-400">Loading comments...</span>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-center">{error}</p>
            <button
              onClick={fetchComments}
              className="mt-2 w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : comments.length === 0 ? (
          <div className="bg-white/5 rounded-xl p-8 border border-white/10 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No comments yet</h3>
            <p className="text-gray-400">
              Be the first to share your thoughts on this story!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onDelete={handleCommentDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 