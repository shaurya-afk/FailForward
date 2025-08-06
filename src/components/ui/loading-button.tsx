"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "gradient";
}

export function LoadingButton({ 
  href, 
  children, 
  className = "", 
  onClick,
  variant = "default" 
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (onClick) {
      onClick();
    }
    
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Navigate to the href
    window.location.href = href;
  };

  const baseClasses = "inline-flex items-center justify-center transition-all duration-300 font-medium";
  
  const variantClasses = {
    default: "text-gray-300 hover:text-purple-400",
    outline: "px-4 py-2 text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white",
    gradient: "px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105"
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${
        isLoading ? "opacity-75 cursor-not-allowed" : ""
      }`}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
} 