"use client";

import StoryCard from '@/components/StoryCard';

import { getAllStories } from '@/data/api';
import { useEffect, useState } from 'react';
import { Story } from '@/types/story';
import { ArrowLeft, TrendingUp, Users, Sparkles, Filter, Search } from 'lucide-react';
import { WavyBackground } from '@/components/ui/wavy-background';
import { LoadingButton } from '@/components/ui/loading-button';

export default function SeeStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isNavigating] = useState(false);

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

  useEffect(() => {
    let filtered = [...stories].reverse();
    
    if (searchTerm) {
      filtered = filtered.filter(story => 
        story.storyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.previewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.founderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(story => story.industry === selectedIndustry);
    }
    
    setFilteredStories(filtered);
  }, [stories, searchTerm, selectedIndustry]);

  const industries = ['all', ...Array.from(new Set(stories.map(story => story.industry)))];



  if (loading || isNavigating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-purple-200 text-lg">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Wavy Background */}
      <WavyBackground className="max-w-7xl mx-auto pb-20">
        <div className="container mx-auto px-6 pt-20">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-8">
                       <LoadingButton
             href="/"
             variant="default"
             className="flex items-center space-x-2 text-purple-200 hover:text-purple-400 transition-colors duration-300 group"
           >
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
             <span className="text-lg font-medium">Back to Home</span>
           </LoadingButton>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-purple-200">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">{stories.length} Stories</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">{new Set(stories.map(s => s.userId)).size} Founders</span>
              </div>
            </div>
          </div>

          {/* Main Title Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-serif font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in-up">
                Founder Stories
              </h1>
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
              Discover real experiences from entrepreneurs who&apos;ve been through the trenches. 
              Every story is a lesson waiting to be learned.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-in-up animation-delay-300">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search stories, founders, or industries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                
                {/* Industry Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4 sm:w-5 sm:h-5" />
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="pl-9 sm:pl-10 pr-8 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer text-sm sm:text-base"
                  >
                    {industries.map(industry => (
                      <option key={industry} value={industry} className="bg-slate-800 text-white">
                        {industry === 'all' ? 'All Industries' : industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="mt-3 sm:mt-4 text-center">
                <span className="text-purple-300 text-xs sm:text-sm">
                  Showing {filteredStories.length} of {stories.length} stories
                </span>
              </div>
            </div>
          </div>
        </div>
      </WavyBackground>

      {/* Stories Grid */}
      <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        {filteredStories.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No stories found</h3>
            <p className="text-purple-200 mb-4 sm:mb-6 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedIndustry('all');
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {filteredStories.map((story, index) => (
              <div
                key={story.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        )}
      </div>

             {/* Floating Action Button */}
       <div className="fixed bottom-8 right-8 z-50">
         <LoadingButton
           href="/share-story"
           variant="gradient"
           className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
         >
           <Sparkles className="w-6 h-6 group-hover:animate-spin" />
         </LoadingButton>
       </div>
    </div>
  );
}