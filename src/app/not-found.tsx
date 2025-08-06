"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-secondary-50 to-white text-center p-6">
      <svg width="120" height="120" fill="none" viewBox="0 0 24 24" className="mb-6 text-accent-amber animate-bounce">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
      </svg>
      <h1 className="text-4xl font-bold mb-4 text-primary">Lost in the Startup Wilderness?</h1>
      <p className="text-lg text-secondary-200 mb-6 max-w-xl">
        The page you&apos;re looking for doesn&apos;t exist. But remember, every wrong turn is just another lesson on the founder&apos;s journey.<br/>
        Let&apos;s get you back on track!
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 text-base font-medium text-white bg-accent-amber rounded-lg hover:bg-opacity-90 shadow-lg transition-all duration-300"
      >
        Go Home
      </button>
    </div>
  );
} 