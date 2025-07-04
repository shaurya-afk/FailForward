"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import { getStoriesByUserId, deleteStory } from "@/data/api";
import { Story } from "@/types/story";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";


export default function MyStoriesPage() {

  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


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

  if(loading) return <Loading />;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* 3. Conditional Rendering Logic */}
      {stories.length === 0 ? (
        // STATE A: User has NO stories
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            You haven't shared a story yet.
          </h1>
          <p className="text-lg text-secondary-200 mb-8">
            Your experience could be the lesson someone else needs.
          </p>
          <Link
            href="/share-story"
            className="px-6 py-3 text-base font-medium text-white bg-accent-amber rounded-lg hover:bg-opacity-90"
          >
            Share Your First Story
          </Link>
        </div>
      ) : (
        // STATE B: User HAS stories
        <div>
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary">
              Your Stories
            </h1>
            <Link
              href="/share-story"
              className="px-6 py-3 text-base font-medium text-white bg-accent-amber rounded-lg hover:bg-opacity-90"
            >
              Post Another Story
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map(story => (
              <div key={story.id} className="relative">
                {/* Edit/Delete buttons at top right, minimal style */}
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="px-2 py-0.5 bg-white border border-red-200 text-red-600 rounded hover:bg-red-50 transition text-xs font-medium shadow-sm"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
                <StoryCard story={story} onLikeChange={fetchStories} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
