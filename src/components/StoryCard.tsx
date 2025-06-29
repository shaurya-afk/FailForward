// src/components/StoryCard.tsx
import { Story } from '@/types/story'; // Import our new type
import { Heart, MessageCircle } from 'lucide-react'; // A popular icon library

// The component accepts an object `story` as a "prop",
// and we use our `Story` type to ensure it's the correct shape.
export default function StoryCard({ story }: { story: Story }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full hover-lift transition-all duration-300 cursor-pointer">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center font-bold text-white mr-3 hover-scale transition-transform duration-200">
          {/* Show initials or a generic icon for anonymity */}
          {story.isAnonymous ? 'A' : story.founderName.charAt(0)}
        </div>
        <div>
          <p className="font-serif font-bold text-primary">
            {story.isAnonymous ? 'An Anonymous Founder' : story.founderName}
          </p>
          <p className="text-sm text-secondary-200">
            Industry: {story.industry}
          </p>
        </div>
      </div>

      {/* Story Preview Section */}
      <h3 className="font-serif text-xl font-bold text-primary mb-2 hover:text-accent-purple cursor-pointer transition-colors duration-200">
        {story.storyTitle}
      </h3>
      <p className="text-secondary-200 mb-4 line-clamp-3">
        {story.previewText}
      </p>

      {/* Engagement Section */}
      <div className="flex items-center justify-start space-x-6 text-secondary-200 border-t border-gray-200 pt-4">
        <div className="flex items-center space-x-2 hover:text-emotional-blue transition-colors duration-200">
          <Heart size={18} className="text-emotional-blue hover:animate-pulse" />
          <span>{story.helpfulVotes} Helpful</span>
        </div>
        <div className="flex items-center space-x-2 hover:text-emotional-blue transition-colors duration-200">
          <MessageCircle size={18} className="text-emotional-blue hover:animate-pulse" />
          <span>{story.commentCount} Comments</span>
        </div>
      </div>
    </div>
  );
}
