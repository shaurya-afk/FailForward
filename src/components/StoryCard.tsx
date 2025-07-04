// src/components/StoryCard.tsx
import { Story } from '@/types/story'; // Import our new type
import { Heart, MessageCircle } from 'lucide-react'; // A popular icon library
import { hasUserLiked, likeStory, unlikeStory } from '@/data/api';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

// The component accepts an object `story` as a "prop",
// and we use our `Story` type to ensure it's the correct shape.
export default function StoryCard({ story, onLikeChange }: { story: Story, onLikeChange: () => void }) {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  // On mount, check if the user has liked this story
  useEffect(() => {
    if (!userId) return;
    hasUserLiked(story.id, userId)
      .then(setLiked)
      .catch(() => setLiked(false));
  }, [story.id, userId]);

  const handleHelpfulClick = async () => {
    if (!userId || disabled) return;
    setAnimate(true);
    setDisabled(true);
    setTimeout(() => setAnimate(false), 250);
    if (!liked) {
      try {
        await likeStory(story.id, userId);
        setLiked(true);
        onLikeChange();
      } catch (error) {
        console.error('Error liking story:', error);
      } finally {
        setDisabled(false);
      }
    } else {
      try {
        await unlikeStory(story.id, userId);
        setLiked(false);
        onLikeChange();
      } catch (error) {
        console.error('Error unliking story:', error);
      } finally {
        setDisabled(false);
      }
    }
  };

  return (
    <div
      className="mx-auto my-8 w-full max-w-md rounded-2xl bg-black shadow-xl transition-colors duration-300 cursor-pointer hover:shadow-[0_0_32px_8px_rgba(80,180,255,0.25)] hover:bg-neutral-800 group relative p-6 md:p-8"
      style={{ boxShadow: '0 4px 32px 0 rgba(34,42,53,0.15)' }}
    >
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-400 to-cyan-400 flex items-center justify-center font-bold text-white mr-4 shadow-lg group-hover:scale-105 transition-transform duration-200">
          {story.isAnonymous ? 'A' : story.founderName.charAt(0)}
        </div>
        <div>
          <p className="font-serif font-bold text-white text-lg">
            {story.isAnonymous ? 'An Anonymous Founder' : story.founderName}
          </p>
          <p className="text-xs text-gray-400">
            Industry: {story.industry}
          </p>
        </div>
      </div>

      {/* Story Preview Section */}
      <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
        {story.storyTitle}
      </h3>
      <p className="text-gray-300 mb-4 line-clamp-3">
        {story.previewText}
      </p>

      {/* Engagement Section */}
      <div className="flex items-center justify-start space-x-8 text-gray-400 pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-2 group-hover:text-blue-400 transition-colors duration-200">
          <Heart
            size={20}
            className={`${liked ? 'text-red-500' : 'text-blue-400'} cursor-pointer transition-transform duration-200 ${animate ? 'scale-125' : ''}`}
            fill={liked ? 'red' : 'none'}
            onClick={handleHelpfulClick}
            style={{ pointerEvents: disabled ? 'none' : 'auto', opacity: disabled ? 0.5 : 1 }}
          />
          <span>{story.helpfulVotes} Helpful</span>
        </div>
        <div className="flex items-center space-x-2 group-hover:text-blue-400 transition-colors duration-200">
          <MessageCircle size={20} className="text-blue-400 hover:animate-pulse" />
          <span>{story.commentCount} Comments</span>
        </div>
      </div>
    </div>
  );
}
