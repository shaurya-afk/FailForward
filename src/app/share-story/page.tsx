"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addStory } from "@/data/api";
import Loading from "@/components/Loading";
import { StoryRequest } from "@/types/story";
import { useUser } from "@clerk/nextjs";
import { Sparkles, User, Eye, EyeOff, Send } from "lucide-react";

export default function ShareStoryPage() {
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [founderName, setFounderName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [helpfulVotes] = useState(0); // default to 0
  const [commentCount] = useState(0); // default to 0

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const { user } = useUser();
  const userId = user?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!userId) {
      setError("You must be signed in to submit a story.");
      setLoading(false);
      return;
    }

    // If isAnonymous, set founderName to 'Anonymous'
    const submitFounderName = isAnonymous ? "Anonymous" : founderName;

    const story: StoryRequest = {
      userId: userId,
      founderName: submitFounderName,
      isAnonymous: isAnonymous,
      storyTitle: title,
      industry: industry,
      previewText: previewText,
      helpfulVotes: helpfulVotes,
      commentCount: commentCount,
    };

    try {
      await addStory(story);
      setSuccess(true);
      setTitle("");
      setIndustry("");
      setPreviewText("");
      setFounderName("");
      setIsAnonymous(false);
      // Redirect to see-stories after successful post
      setIsNavigating(true);
      router.push("/see-stories");
    } catch (error: any) {
      setError(error?.message || "Failed to submit story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if(loading || isNavigating) return <Loading />;

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Share Your Story
              </h1>
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Help others learn from your experience. Your story could save someone from making the same mistakes.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Story Title */}
              <div>
                <label htmlFor="storyTitle" className="block text-lg font-semibold text-white mb-3">
                  Story Title
                </label>
                <input
                  type="text"
                  name="storyTitle"
                  id="storyTitle"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., How We Burned Through $1M in 6 Months"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-lg font-semibold text-white mb-3">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="" className="bg-slate-800 text-white">Select an industry</option>
                  <option value="SaaS" className="bg-slate-800 text-white">SaaS</option>
                  <option value="E-commerce" className="bg-slate-800 text-white">E-commerce</option>
                  <option value="Fintech" className="bg-slate-800 text-white">Fintech</option>
                  <option value="Healthtech" className="bg-slate-800 text-white">Healthtech</option>
                  <option value="Edutech" className="bg-slate-800 text-white">Edutech</option>
                  <option value="Marketplace" className="bg-slate-800 text-white">Marketplace</option>
                  <option value="Deep Tech" className="bg-slate-800 text-white">Deep Tech</option>
                  <option value="Consumer" className="bg-slate-800 text-white">Consumer</option>
                  <option value="Other" className="bg-slate-800 text-white">Other</option>
                </select>
              </div>

              {/* Story Preview */}
              <div>
                <label htmlFor="previewText" className="block text-lg font-semibold text-white mb-3">
                  Short Summary / TL;DR
                </label>
                <textarea
                  id="previewText"
                  name="previewText"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="A brief preview of your story. This will be shown on the story card."
                  maxLength={300}
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                ></textarea>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-purple-300">Max 300 characters.</p>
                  <span className="text-sm text-purple-300">{previewText.length}/300</span>
                </div>
              </div>

              {/* Founder Name & Anonymity */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Author Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="founderName" className="block text-sm font-medium text-purple-200 mb-2">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="founderName"
                      id="founderName"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                      placeholder="Jane Doe"
                      value={founderName}
                      onChange={(e) => setFounderName(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      {isAnonymous ? (
                        <EyeOff className="w-5 h-5 text-purple-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-purple-400" />
                      )}
                      <div className="flex items-center">
                        <input
                          id="isAnonymous"
                          name="isAnonymous"
                          type="checkbox"
                          className="h-5 w-5 text-purple-500 border-white/20 rounded focus:ring-purple-400 bg-white/10"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                        <label htmlFor="isAnonymous" className="ml-3 text-sm text-white">
                          Post anonymously
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-purple-300 bg-purple-500/10 p-4 rounded-xl border border-purple-500/20">
                  💡 <strong>Privacy Tip:</strong> If you check "Post anonymously", your name won't be displayed even if you enter it. 
                  If you leave the name field blank, it will be posted as "Anonymous".
                </p>
              </div>

              {/* Hidden fields for helpfulVotes and commentCount */}
              <input type="hidden" name="helpfulVotes" value={helpfulVotes} />
              <input type="hidden" name="commentCount" value={commentCount} />

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading || !userId}
                  className="w-full px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : !userId ? (
                    <>
                      <User className="w-5 h-5" />
                      <span>Sign in to submit</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Share My Story</span>
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-400 text-center">{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 