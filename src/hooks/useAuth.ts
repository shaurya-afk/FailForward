"use client";

import { useAuth as useClerkAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  return useClerkAuth();
}

export function useNavigationWithLoading() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigateWithLoading = (href: string) => {
    setIsNavigating(true);
    router.push(href);
  };

  return {
    isNavigating,
    navigateWithLoading,
    setIsNavigating
  };
} 