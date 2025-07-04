"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addStory } from "@/data/api";
import Loading from "@/components/Loading";
import { StoryRequest } from "@/types/story";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/stateful-button";

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
  const router = useRouter();

  const [buttonStatus, setButtonStatus] = useState<"idle" | "loading" | "success">("idle");

  const { user } = useUser();
  const userId = user?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonStatus("loading");
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!userId) {
      setButtonStatus("idle");
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
      setButtonStatus("success");
      setSuccess(true);
      setTitle("");
      setIndustry("");
      setPreviewText("");
      setFounderName("");
      setIsAnonymous(false);
      // Redirect to see-stories after successful post
      router.push("/see-stories");
    } catch (error: any) {
      setError(error?.message || "Failed to submit story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <Loading />;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8 animate-fade-in-up">
          Share Your Story
        </h1>
        <p className="text-lg text-secondary-200 mb-8 animate-fade-in-up animation-delay-200">
          Help others learn from your experience. Your story could save someone from making the same mistakes.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in-up animation-delay-300">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Story Title */}
            <div>
              <label htmlFor="storyTitle" className="block text-sm font-medium text-secondary-200">
                Story Title
              </label>
              <input
                type="text"
                name="storyTitle"
                id="storyTitle"
                required
                className="mt-1 block w-full px-4 py-2 border border-secondary-100 rounded-md shadow-sm focus:ring-accent-amber focus:border-accent-amber sm:text-sm"
                placeholder="e.g., How We Burned Through $1M in 6 Months"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-secondary-200">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                required
                className="mt-1 block w-full px-4 py-2 border border-secondary-100 bg-white rounded-md shadow-sm focus:ring-accent-amber focus:border-accent-amber sm:text-sm"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Select an industry</option>
                <option value="SaaS">SaaS</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Fintech">Fintech</option>
                <option value="Healthtech">Healthtech</option>
                <option value="Edutech">Edutech</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Deep Tech">Deep Tech</option>
                <option value="Consumer">Consumer</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Story Preview */}
            <div>
              <label htmlFor="previewText" className="block text-sm font-medium text-secondary-200">
                Short Summary / TL;DR
              </label>
              <textarea
                id="previewText"
                name="previewText"
                rows={3}
                required
                className="mt-1 block w-full px-4 py-2 border border-secondary-100 rounded-md shadow-sm focus:ring-accent-amber focus:border-accent-amber sm:text-sm"
                placeholder="A brief preview of your story. This will be shown on the story card."
                maxLength={300}
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
              ></textarea>
              <p className="mt-2 text-xs text-secondary-100">Max 300 characters.</p>
            </div>

            {/* Founder Name & Anonymity */}
            <div className="border-t border-secondary-100 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="founderName" className="block text-sm font-medium text-secondary-200">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="founderName"
                    id="founderName"
                    className="mt-1 block w-full px-4 py-2 border border-secondary-100 rounded-md shadow-sm focus:ring-accent-amber focus:border-accent-amber sm:text-sm"
                    placeholder="Jane Doe"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                  />
                </div>
                <div className="flex items-center h-full mt-1 md:mt-7">
                  <div className="flex items-center">
                    <input
                      id="isAnonymous"
                      name="isAnonymous"
                      type="checkbox"
                      className="h-4 w-4 text-accent-amber border-secondary-100 rounded focus:ring-accent-amber"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <label htmlFor="isAnonymous" className="ml-2 block text-sm text-secondary-200">
                      Post completely anonymously
                    </label>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-secondary-100">
                If you check the box, your name won't be displayed, even if you enter it. If you leave the name field blank, it will be posted as "Anonymous".
              </p>
            </div>

            {/* Hidden fields for helpfulVotes and commentCount */}
            <input type="hidden" name="helpfulVotes" value={helpfulVotes} />
            <input type="hidden" name="commentCount" value={commentCount} />

            {/* Submit Button */}
            <div className="flex h-40 w-full items-center justify-center">
              <Button
                type="submit"
                disabled={loading || !userId}
              >
                
                {loading ? "Submitting..." : !userId ? "Sign in to submit" : "Submit My Story"}
              </Button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
} 