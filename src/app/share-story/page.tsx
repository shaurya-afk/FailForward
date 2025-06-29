import { auth } from "@clerk/nextjs";
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
          <p className="text-secondary-200 text-center">
            Story submission form coming soon...
          </p>
          <p className="text-sm text-secondary-100 text-center mt-4">
            You are authenticated as user: {userId}
          </p>
        </div>
      </div>
    </div>
  );
} 