"use client";

import StoryCard from '@/components/StoryCard';
import { dummyStories } from '@/data/stories';
import Link from 'next/link';
import { getAllStories } from '@/data/api';
import { useEffect, useState } from 'react';
import { Story } from '@/types/story';

export default function SeeStoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllStories()
        .then(setStories)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    if(loading) return <div>Loading...</div>;

    return(
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-primary mb-4 animate-fade-in-up">
                    All Stories
                </h1>
                <p className="mt-4 text-lg text-secondary-200 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                  Browse the collection of experiences shared by founders.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div 
                key={story.id} 
                className={`animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              >
                <StoryCard story={story} />
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