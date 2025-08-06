"use client";
import { useState, useEffect } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Stories", href: "/see-stories" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/80 backdrop-blur-lg border-b border-white/10 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FailForward
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <LoadingButton
                key={item.name}
                href={item.href}
                variant="default"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
              >
                {item.name}
              </LoadingButton>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
              <LoadingButton
                href="/my-stories"
                variant="outline"
                className="px-4 py-2 text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-300"
              >
                My Stories
              </LoadingButton>
            </SignedIn>
            <SignedOut>
              <LoadingButton
                href="/sign-in"
                variant="default"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                Sign In
              </LoadingButton>
              <LoadingButton
                href="/sign-up"
                variant="gradient"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </LoadingButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-purple-400 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 border-t border-white/10">
            {navItems.map((item) => (
              <LoadingButton
                key={item.name}
                href={item.href}
                variant="default"
                className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </LoadingButton>
            ))}
            
            <div className="pt-4 space-y-3 border-t border-white/10">
              <SignedIn>
                <div className="flex items-center justify-center py-2">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                </div>
                <LoadingButton
                  href="/my-stories"
                  variant="outline"
                  className="block w-full text-center px-4 py-2 text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Stories
                </LoadingButton>
              </SignedIn>
              <SignedOut>
                <LoadingButton
                  href="/sign-in"
                  variant="default"
                  className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </LoadingButton>
                <LoadingButton
                  href="/sign-up"
                  variant="gradient"
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </LoadingButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

