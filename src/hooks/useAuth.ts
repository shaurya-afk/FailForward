"use client";

import { useAuth, useSignIn } from "@clerk/nextjs";
import { useState } from "react";

export function useAuthHandler() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signIn, setActive } = useSignIn();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleShareStory = async () => {
    console.log("handleShareStory called");
    console.log("isLoaded:", isLoaded);
    console.log("isSignedIn:", isSignedIn);
    console.log("signIn available:", !!signIn);

    if (!isLoaded) {
      console.log("Clerk is still loading...");
      return;
    }

    if (isSignedIn) {
      // User is authenticated, redirect to share story page
      console.log("User is authenticated, redirecting to share story...");
      window.location.href = "/share-story";
    } else {
      // User is not authenticated, show sign-in modal
      setIsSigningIn(true);
      try {
        console.log("Attempting to sign in...");
        
        // Check if Clerk is properly configured
        if (!signIn) {
          console.error("Clerk signIn is not available - check environment variables");
          alert("Authentication not configured. Please set up Clerk environment variables.");
          setIsSigningIn(false);
          return;
        }

        // Try to open sign-in modal
        await signIn.create({
          strategy: "oauth_google",
          redirectUrl: "/share-story",
        });
      } catch (error) {
        console.error("Sign-in error:", error);
        alert("Sign-in failed. Please check your Clerk configuration or try again.");
        setIsSigningIn(false);
      }
    }
  };

  return {
    isSignedIn,
    isLoaded,
    isSigningIn,
    handleShareStory,
  };
} 