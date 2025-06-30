"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuthHandler() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleShareStory = () => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      router.push("/share-story");
    } else {
      router.push("/sign-in?redirect_url=/share-story");
    }
  };

  return {
    isSignedIn,
    isLoaded,
    isSigningIn,
    handleShareStory,
  };
} 