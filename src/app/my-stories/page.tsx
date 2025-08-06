"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import { getStoriesByUserId, deleteStory } from "@/data/api";
import { Story } from "@/types/story";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { LoadingButton } from "@/components/ui/loading-button";


export default function MyStoriesPage() {

  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (href: string) => {
    setIsNavigating(true);
    window.location.href = href;
  };


  // 1. Get user's auth state
  const { userId } = useAuth();

  const fetchStories = () => {
    if(!userId) return;
    setLoading(true);
    getStoriesByUserId(userId)
    .then(setStories)
    .catch(setError)
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    if(!userId) return;
    getStoriesByUserId(userId)
    .then(setStories)
    .catch(setError)
    .finally(() => setLoading(false));
  }, [userId]);

  // Add a delete handler (to be implemented)
  const handleDelete = (id: number) => {
    deleteStory(id)
    .then(() => {
      setStories(stories.filter(story => story.id !== id));
    })
    .catch(setError)
    .finally(() => setLoading(false));
  };

  // Update only the changed story in the stories array
  const handleStoryUpdate = (updatedStory: Story) => {
    setStories(prevStories =>
      prevStories.map(story =>
        story.id === updatedStory.id ? updatedStory : story
      )
    );
  };

  if(loading || isNavigating) return <Loading />;

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 3. Conditional Rendering Logic */}
        {stories.length === 0 ? (
          // STATE A: User has NO stories
          <div className="text-center py-12 sm:py-20">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              You haven't shared a story yet.
            </h1>
            <p className="text-lg sm:text-xl text-purple-200 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              Your experience could be the lesson someone else needs. Share your journey and help others avoid the same pitfalls.
            </p>
            <LoadingButton
              href="/share-story"
              variant="gradient"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Share Your First Story
            </LoadingButton>
          </div>
        ) : (
          // STATE B: User HAS stories
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Your Stories
                </h1>
                <p className="text-purple-200 text-base sm:text-lg">
                  {stories.length} story{stories.length !== 1 ? 's' : ''} shared
                </p>
              </div>
              <LoadingButton
                href="/share-story"
                variant="outline"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-purple-400 border-2 border-purple-400 rounded-xl hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Post Another Story
              </LoadingButton>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {stories.map(story => (
                <div key={story.id} className="relative group">
                  {/* Delete button */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="px-2 sm:px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-xs sm:text-sm font-medium shadow-lg"
                      title="Delete Story"
                    >
                      Delete
                    </button>
                  </div>
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
