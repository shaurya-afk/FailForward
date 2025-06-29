"use client";

// src/app/page.tsx
import StoryCard from '@/components/StoryCard';
import { Story } from '@/types/story';
import { useAuthHandler } from '@/hooks/useAuth';

// Our "dummy" data. In the future, this will come from our database.
const dummyStories: Story[] = [
  {
    id: '1',
    founderName: 'Jane Doe',
    isAnonymous: false,
    storyTitle: 'What I Learned from my Failed E-commerce Startup',
    industry: 'E-commerce',
    previewText: 'We had a great product, but our marketing strategy completely missed the mark. I spent two years building a brand that nobody knew existed. Here\'s the story of what went wrong and the key lesson I took away about customer acquisition...',
    helpfulVotes: 128,
    commentCount: 14,
  },
  {
    id: '2',
    founderName: 'John Smith',
    isAnonymous: true,
    storyTitle: 'My Co-Founder Conflict Ended Our SaaS Dream',
    industry: 'SaaS',
    previewText: 'Everything was going perfectly until my co-founder and I had a fundamental disagreement about the company\'s direction. Our inability to communicate effectively was our downfall. This is a cautionary tale about choosing your partners wisely.',
    helpfulVotes: 256,
    commentCount: 32,
  },
   {
    id: '3',
    founderName: 'Alex Ray',
    isAnonymous: false,
    storyTitle: 'We Ran Out of Money: A Classic Startup Failure',
    industry: 'Fintech',
    previewText: 'It\'s the story you hear all the time, but you never think it will happen to you. Our burn rate was too high, and our next round of funding fell through. I learned a hard lesson about financial discipline and runway management.',
    helpfulVotes: 94,
    commentCount: 21,
  },
];

export default function Home() {
  const { handleShareStory, isSigningIn } = useAuthHandler();

  return (
    // We use a fragment <> to wrap multiple sections
    <>
      {/* Hero Section (from Step 2) */}
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight animate-fade-in-up">
          Your failure is someone's lesson.
        </h1>
        <p className="mt-4 text-lg text-secondary-200 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Share your story, help others avoid the same mistakes. We believe every setback is a stepping stone in disguise.
        </p>
        <div className="mt-8 flex justify-center space-x-4 animate-fade-in-up animation-delay-300">
           <button 
             onClick={handleShareStory}
             disabled={isSigningIn}
             className="px-6 py-3 text-base font-medium text-white bg-accent-amber rounded-lg hover:bg-opacity-90 shadow-lg hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
           >
              {isSigningIn ? 'Signing in...' : 'Share My Story'}
            </button>
            <button className="px-6 py-3 text-base font-medium text-primary border border-secondary-100 rounded-lg hover:bg-gray-100 hover-lift transition-all duration-300">
              Read Stories
            </button>
        </div>
        <p className="mt-4 text-sm text-secondary-100 animate-fade-in-up animation-delay-400">
          Anonymous options available. Your safety is our priority.
        </p>
      </div>

      {/* Recent Stories Feed Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-serif font-bold text-center mb-8 animate-slide-in-top">Recent Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyStories.map((story, index) => (
            <div 
              key={story.id} 
              className={`animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
