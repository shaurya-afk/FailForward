import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { dummyStories } from "@/data/stories";
import StoryCard from "@/components/StoryCard";

export default async function MyStoriesPage() {
  // 1. Get user's auth state
  const { userId } = await auth();
  if (!userId) {
    // Redirect non-logged-in users
    redirect("/sign-in");
  }

  // 2. Filter stories to get only those by the current user
  const userStories = dummyStories.filter(story => story.userId === userId);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* 3. Conditional Rendering Logic */}
      {userStories.length === 0 ? (
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
            {userStories.map(story => (
              <div key={story.id}>
                <StoryCard story={story} />
                {/* In the future, you could add Edit/Delete buttons here */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
