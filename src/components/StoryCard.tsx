// src/components/StoryCard.tsx
import { Story } from '@/types/story'; // Import our new type
import { Heart, MessageCircle } from 'lucide-react'; // A popular icon library
import { hasUserLiked, likeStory, unlikeStory } from '@/data/api';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// The component accepts an object `story` as a "prop",
// and we use our `Story` type to ensure it's the correct shape.
export default function StoryCard({ story }: { story: Story }) {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [localHelpfulVotes, setLocalHelpfulVotes] = useState(story.helpfulVotes || 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();
  const userId = user?.id;
  const router = useRouter();

  // On mount, check if the user has liked this story
  useEffect(() => {
    if (!userId) return;
    hasUserLiked(story.id, userId)
      .then(setLiked)
      .catch(() => setLiked(false));
  }, [story.id, userId]);

  // Update local helpful votes when story prop changes
  useEffect(() => {
    setLocalHelpfulVotes(story.helpfulVotes || 0);
  }, [story.helpfulVotes]);

  // Debounced like handler to prevent rapid clicks
  const handleHelpfulClick = useCallback(async (e: React.MouseEvent) => {
    // Prevent any default behavior and stop propagation immediately
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    if (!userId) {
      console.log('User not authenticated, cannot like story');
      return;
    }
    
    if (disabled || isProcessing) {
      console.log('Request already in progress');
      return;
    }
    
    setIsProcessing(true);
    setAnimate(true);
    setDisabled(true);
    setTimeout(() => setAnimate(false), 250);
    
    const previousLiked = liked;
    const previousVotes = localHelpfulVotes;
    
    try {
      if (!liked) {
        console.log('Liking story:', story.id, 'for user:', userId);
        // Optimistic update
        setLiked(true);
        setLocalHelpfulVotes(prev => prev + 1);
        
        try {
          const updatedStory = await likeStory(story.id, userId);
          console.log('Successfully liked story, updated votes:', updatedStory.helpfulVotes);
          
          // Use the updated story data from backend
          if (updatedStory && typeof updatedStory.helpfulVotes === 'number' && updatedStory.helpfulVotes >= 0) {
            setLocalHelpfulVotes(updatedStory.helpfulVotes);
          }
        } catch (apiError) {
          console.error('API error, reverting optimistic update:', apiError);
          // Revert the optimistic update on API error
          setLiked(previousLiked);
          setLocalHelpfulVotes(previousVotes);
          throw apiError; // Re-throw to be caught by outer catch
        }
      } else {
        console.log('Unliking story:', story.id, 'for user:', userId);
        // Optimistic update
        setLiked(false);
        setLocalHelpfulVotes(prev => Math.max(0, prev - 1));
        
        try {
          const updatedStory = await unlikeStory(story.id, userId);
          console.log('Successfully unliked story, updated votes:', updatedStory.helpfulVotes);
          
          // Use the updated story data from backend
          if (updatedStory && typeof updatedStory.helpfulVotes === 'number' && updatedStory.helpfulVotes >= 0) {
            setLocalHelpfulVotes(updatedStory.helpfulVotes);
          }
        } catch (apiError) {
          console.error('API error, reverting optimistic update:', apiError);
          // Revert the optimistic update on API error
          setLiked(previousLiked);
          setLocalHelpfulVotes(previousVotes);
          throw apiError; // Re-throw to be caught by outer catch
        }
      }
      
    } catch (error) {
      console.error('Error updating like:', error);
      // Error handling is done in the inner try-catch blocks
    } finally {
      setDisabled(false);
      setIsProcessing(false);
    }
  }, [liked, localHelpfulVotes, story.id, userId, disabled, isProcessing]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the like button or any button
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    router.push(`/story/${story.id}`);
  };

  return (
    <div
      className="w-full rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-500 cursor-pointer hover:shadow-[0_0_40px_10px_rgba(168,85,247,0.15)] hover:border-purple-500/30 hover:scale-[1.02] group relative p-4 sm:p-6 md:p-8 overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      {/* Header Section */}
      <div className="flex items-center mb-4 sm:mb-6 relative z-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center font-bold text-white mr-3 sm:mr-4 shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:rotate-3 text-sm sm:text-base">
          {story.isAnonymous ? 'A' : story.founderName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-white text-base sm:text-lg group-hover:text-purple-300 transition-colors duration-300 truncate">
            {story.isAnonymous ? 'An Anonymous Founder' : story.founderName}
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-purple-300 font-medium bg-purple-500/20 px-2 py-1 rounded-full">
              {story.industry}
            </span>
          </div>
        </div>
      </div>

      {/* Story Preview Section */}
      <div className="relative z-10">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
          {story.storyTitle}
        </h3>
        <p className="text-gray-300 mb-4 sm:mb-6 line-clamp-3 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base">
          {story.previewText}
        </p>
      </div>

      {/* Engagement Section */}
      <div className="flex items-center justify-between text-gray-400 pt-6 border-t border-white/10 relative z-10">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="flex items-center space-x-2 group-hover:text-purple-400 transition-colors duration-300">
            <div 
              className="inline-block"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              <button
                onClick={handleHelpfulClick}
                disabled={disabled || !userId || isProcessing}
                className={`p-1 rounded-lg transition-all duration-300 ${
                  disabled || !userId || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500/20 cursor-pointer'
                }`}
                title={!userId ? 'Sign in to like stories' : liked ? 'Unlike this story' : 'Like this story'}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onMouseUp={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Heart
                  size={20}
                  className={`${liked ? 'text-red-500' : userId ? 'text-purple-400' : 'text-gray-500'} transition-all duration-300 ${animate ? 'scale-125' : ''} ${disabled || isProcessing ? 'animate-pulse' : ''} hover:scale-110`}
                  fill={liked ? 'red' : 'none'}
                />
              </button>
            </div>
            <span className="font-medium text-sm sm:text-base">{localHelpfulVotes} Helpful</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-500">
            <MessageCircle size={18} />
            <span className="text-sm sm:text-base">{story.commentCount || 0} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
