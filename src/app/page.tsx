"use client";

import Link from 'next/link';
import StoryCard from '@/components/StoryCard';
import { useAuthHandler } from '@/hooks/useAuth';
import { dummyStories } from '@/data/stories';
import { checkHealth } from '@/data/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

export default function Home() {
  const router = useRouter();

  const [health, setHealth] = useState(true);
  const [loading, setLoading] = useState(true);
  const { handleShareStory, isSigningIn } = useAuthHandler();

  useEffect(() => {
    checkHealth()
    .then(setHealth)
    .catch(console.error)
    .finally(() => setLoading(false))
  }, []);

  useEffect(() => {
    if(!loading && !health){
      router.replace('/server-down');
    }
  }, [loading, health, router]);

  if(loading) return <Loading/>;

  return (
    <>
      {/* Hero Section*/}
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
          <Link href="/see-stories" className="px-6 py-3 text-base font-medium text-primary border border-secondary-100 rounded-lg hover:bg-gray-100 hover-lift transition-all duration-300">
            Read Stories
          </Link>
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
