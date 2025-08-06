import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { addComment } from '@/data/api';
import { Send, Eye, EyeOff, User } from 'lucide-react';

interface CommentFormProps {
  storyId: number;
  onCommentAdded: () => void;
}

export default function CommentForm({ storyId, onCommentAdded }: CommentFormProps) {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment({
        storyId,
        userId: user.id,
        commenterName: commenterName.trim() || undefined,
        isAnonymous,
        content: content.trim(),
      });

      // Reset form
      setContent('');
      setCommenterName('');
      setIsAnonymous(false);
      
      // Notify parent component
      onCommentAdded();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <p className="text-gray-400 text-center">
          Please sign in to leave a comment
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Add a Comment</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Commenter Name */}
        {!isAnonymous && (
          <div>
            <label htmlFor="commenterName" className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="commenterName"
              value={commenterName}
              onChange={(e) => setCommenterName(e.target.value)}
              placeholder="Enter your name (optional)"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Anonymous Toggle */}
        <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
          {isAnonymous ? (
            <EyeOff className="w-5 h-5 text-purple-400" />
          ) : (
            <Eye className="w-5 h-5 text-purple-400" />
          )}
          <div className="flex items-center">
            <input
              id="isAnonymous"
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-5 w-5 text-purple-500 border-white/20 rounded focus:ring-purple-400 bg-white/10"
            />
            <label htmlFor="isAnonymous" className="ml-3 text-sm text-white">
              Comment anonymously
            </label>
          </div>
        </div>

        {/* Comment Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            Comment
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            required
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="flex items-center justify-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Posting...' : 'Post Comment'}</span>
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-400 bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
          💡 <strong>Privacy:</strong> {isAnonymous 
            ? 'Your comment will be posted anonymously. Your name will not be displayed.' 
            : 'Your comment will be posted with your name. You can choose to comment anonymously instead.'
          }
        </p>
      </form>
    </div>
  );
} 