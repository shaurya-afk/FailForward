import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ShareStoryPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

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
        <form className="space-y-6">
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
            ></textarea>
            <p className="mt-2 text-xs text-secondary-100">Max 300 characters.</p>
          </div>

          {/* Full Story Content */}
          <div>
            <label htmlFor="storyContent" className="block text-sm font-medium text-secondary-200">
              Your Full Story
            </label>
            <textarea
              id="storyContent"
              name="storyContent"
              rows={12}
              required
              className="mt-1 block w-full px-4 py-2 border border-secondary-100 rounded-md shadow-sm focus:ring-accent-amber focus:border-accent-amber sm:text-sm"
              placeholder="Share the details of your journey. What went wrong? What did you learn? Be as detailed as you're comfortable with."
            ></textarea>
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
                    />
                </div>
                <div className="flex items-center h-full mt-1 md:mt-7">
                    <div className="flex items-center">
                        <input
                        id="isAnonymous"
                        name="isAnonymous"
                        type="checkbox"
                        className="h-4 w-4 text-accent-amber border-secondary-100 rounded focus:ring-accent-amber"
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

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center px-6 py-3 text-base font-medium text-white bg-accent-amber rounded-lg hover:bg-opacity-90 shadow-lg hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit My Story
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
} 