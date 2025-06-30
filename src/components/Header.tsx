// src/components/Header.tsx
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="w-full bg-background-cream border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-serif font-bold text-primary">
          FailForward
        </Link>
        <div className="flex items-center space-x-4">
          {/* This will show only when the user is logged IN */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <Link href="/my-stories" className="px-4 py-2 text-sm font-medium text-primary hover:text-accent-purple">
              My Stories
            </Link>
          </SignedIn>

          {/* This will show only when the user is logged OUT */}
          <SignedOut>
            <Link href="/sign-in" className="px-4 py-2 text-sm font-medium text-primary hover:text-accent-purple">
              Sign In
            </Link>
            <Link href="/sign-up" className="px-4 py-2 text-sm font-medium text-white bg-accent-amber rounded-lg hover:bg-opacity-90">
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
