"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Share2, User, Calendar, MapPin, Building, Sparkles, MessageCircle } from 'lucide-react';
import { Story } from '@/types/story';
import { getAllStories, likeStory, unlikeStory, hasUserLiked } from '@/data/api';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Loading from '@/components/Loading';
import CommentsSection from '@/components/CommentsSection';

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [localHelpfulVotes, setLocalHelpfulVotes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  const storyId = params.id as string;

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const stories = await getAllStories();
        const foundStory = stories.find(s => s.id.toString() === storyId);
        if (foundStory) {
          setStory(foundStory);
          setLocalHelpfulVotes(foundStory.helpfulVotes || 0);
        } else {
          router.push('/not-found');
        }
      } catch (error) {
        console.error('Error fetching story:', error);
        router.push('/server-down');
      } finally {
        setLoading(false);
      }
    };

    if (storyId) {
      fetchStory();
    }
  }, [storyId, router]);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (user?.id && story) {
        try {
          const hasLiked = await hasUserLiked(story.id, user.id);
          setLiked(hasLiked);
        } catch (error) {
          console.error('Error checking like status:', error);
        }
      }
    };

    checkLikeStatus();
  }, [user?.id, story]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    // Prevent any default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    if (!user?.id || !story) return;

    setIsLiking(true);
    const previousLiked = liked;
    const previousVotes = localHelpfulVotes;

    // Optimistic update
    setLiked(!liked);
    setLocalHelpfulVotes(prev => liked ? prev - 1 : prev + 1);

    try {
      if (liked) {
        try {
          const updatedStory = await unlikeStory(story.id, user.id);
          console.log('Story unliked successfully, updated votes:', updatedStory.helpfulVotes);
          
          // Use the updated story data from backend
          if (updatedStory && typeof updatedStory.helpfulVotes === 'number' && updatedStory.helpfulVotes >= 0) {
            setLocalHelpfulVotes(updatedStory.helpfulVotes);
          }
        } catch (apiError) {
          console.error('API error but keeping optimistic update:', apiError);
          // Keep the optimistic update even if API fails
        }
      } else {
        try {
          const updatedStory = await likeStory(story.id, user.id);
          console.log('Story liked successfully, updated votes:', updatedStory.helpfulVotes);
          
          // Use the updated story data from backend
          if (updatedStory && typeof updatedStory.helpfulVotes === 'number' && updatedStory.helpfulVotes >= 0) {
            setLocalHelpfulVotes(updatedStory.helpfulVotes);
          }
        } catch (apiError) {
          console.error('API error but keeping optimistic update:', apiError);
          // Keep the optimistic update even if API fails
        }
      }
    } catch (error) {
      console.error('Error updating like:', error);
      // Revert optimistic update
      setLiked(previousLiked);
      setLocalHelpfulVotes(previousVotes);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) return <Loading />;

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Story not found</h1>
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center font-bold text-white mr-4 shadow-lg">
                {story.isAnonymous ? 'A' : story.founderName.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {story.storyTitle}
                </h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{story.isAnonymous ? 'Anonymous Founder' : story.founderName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{story.industry}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="prose prose-invert max-w-none mb-8">
              <div className="text-gray-200 leading-relaxed text-lg">
                {story.storyContent || story.previewText}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 py-6 border-t border-white/10">
              <div className="flex items-center justify-center sm:justify-start space-x-6">
                {/* Like Button */}
                <button
                  onClick={handleLikeClick}
                  disabled={isLiking || !user?.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    liked 
                      ? 'text-pink-400 bg-pink-500/20' 
                      : 'text-purple-300 hover:text-pink-400 hover:bg-pink-500/20'
                  } ${isLiking ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseUp={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{localHelpfulVotes}</span>
                </button>
              </div>

              {/* Share Button */}
              <button className="flex items-center justify-center sm:justify-end space-x-2 px-4 py-2 text-purple-300 hover:text-purple-400 hover:bg-purple-500/20 rounded-xl transition-all duration-300">
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <CommentsSection storyId={story.id} initialCommentCount={story.commentCount} />
          </div>
        </div>
      </div>
    </div>
  );
} 