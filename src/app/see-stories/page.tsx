"use client";

import StoryCard from '@/components/StoryCard';
import Link from 'next/link';
import { getAllStories } from '@/data/api';
import { useEffect, useState } from 'react';
import { Story } from '@/types/story';
import { Star } from 'lucide-react';
import { color } from 'motion';

export default function SeeStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = () => {
    setLoading(true);
    getAllStories()
      .then(setStories)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4 animate-fade-in-up mt-10" style={{ color: "#fff" }}>
          All Stories
        </h1>
        <p className="mt-4 text-lg text-secondary-200 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Browse the collection of experiences shared by founders.
        </p>
      </div>
      {/* Stories as vertical scroll (social feed style) */}
      <div className="flex flex-col gap-8 pb-4">
        {[...stories].reverse().map((story, index) => (
          <div
            key={story.id}
            className={`w-full animate-fade-in-up animation-delay-${(index + 1) * 100}`}
          >
            <StoryCard story={story} onLikeChange={fetchStories} />
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/" className="px-6 py-3 text-base font-medium text-primary border border-secondary-100 rounded-lg hover:bg-gray-100 hover-lift transition-all duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  )
}