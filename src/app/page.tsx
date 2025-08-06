"use client";

import { useAuth } from '@/hooks/useAuth';
import { LoadingButton } from '@/components/ui/loading-button';
import { Story } from '@/types/story';
import { checkHealth, getAllStories } from '@/data/api';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { WavyBackground } from '@/components/ui/wavy-background';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const [stories, setStories] = useState<Story[]>([]);

  const [health, setHealth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isNavigating] = useState(false);
  const { isSignedIn } = useAuth();



  useEffect(() => {
    checkHealth()
      .then(setHealth)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, []);

  useEffect(() => {
    if (!loading && !health) {
      router.replace('/server-down');
    }
  }, [loading, health, router]);


  const fetchStories = useCallback(() => {
    setLoading(true);
    getAllStories()
      .then(setStories)
      .catch((error) => {
        console.error('Error fetching stories:', error);
        // If it's a network error, we might want to redirect to server-down page
        if (error.status === 0) {
          router.replace('/server-down');
        }
      })
      .finally(() => setLoading(false))
  }, [router]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  if (loading || isNavigating) return <Loading />;

  return (
    <>
      <div>
        <WavyBackground className='max-w-4xl mx-auto pb-40'>

          {/* Hero Section*/}
          <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight animate-fade-in-up bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Your failure is someone&apos;s lesson.
            </h1>
            <p className="mt-6 text-xl text-purple-200 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
              Share your story, help others avoid the same mistakes. We believe every setback is a stepping stone in disguise.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up animation-delay-300">
              <LoadingButton
                href={isSignedIn ? "/share-story" : "/sign-in?redirect_url=/share-story"}
                variant="gradient"
                className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Share My Story
              </LoadingButton>

              <LoadingButton
                href="/see-stories"
                variant="outline"
                className="px-8 py-4 text-lg font-medium text-purple-400 border-2 border-purple-400 rounded-xl hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Read Stories
              </LoadingButton>
            </div>
            <p className="mt-6 text-sm text-purple-300 animate-fade-in-up animation-delay-400">
              Anonymous options available. Your safety is our priority.
            </p>
          </div>
        </WavyBackground>


        {/* Recent Stories Feed Section */}
        <div className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Recent Stories
                </h2>
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-lg text-purple-200 max-w-2xl mx-auto">
                Discover the latest experiences shared by founders. Every story is a lesson waiting to be learned.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-full blur-lg"></div>
              </div>
              
              <div className="h-[40rem] flex flex-col antialiased items-center justify-center relative overflow-hidden">
                {stories.length === 0 ? (
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No stories yet</h3>
                    <p className="text-purple-200 mb-6">Be the first to share your experience!</p>
                                 <LoadingButton
               href="/share-story"
               variant="gradient"
               className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
             >
               Share Your Story
             </LoadingButton>
                  </div>
                ) : (
                  <InfiniteMovingCards
                    items={stories.map(story => ({
                      quote: story.previewText || story.storyTitle,
                      name: story.isAnonymous ? "Anonymous" : story.founderName,
                      title: story.storyTitle,
                      id: story.id,
                    }))}
                    direction='right'
                    speed='slow'
                  />
                )}
              </div>
              
              {/* View All Stories Button */}
              <div className="text-center mt-8">
                               <LoadingButton
                 href="/see-stories"
                 variant="outline"
                 className="inline-flex items-center space-x-2 px-6 py-3 text-purple-400 border-2 border-purple-400 rounded-xl hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300"
               >
                 <span>View All Stories</span>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <About/> */}


      {/* <div className="container mx-auto px-6 py-12">
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
      </div> */}
    </>
  );
}
