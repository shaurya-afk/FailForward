"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Learn from Real Failures",
    description:
      "Every failure shared is a roadmap for someone else. At FailForward, we believe transparency builds stronger founders. Discover real stories of what went wrong—and what you can avoid.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--rose-500),var(--pink-500))] text-white font-bold text-xl">
        Raw, Real, and Relatable
      </div>
    ),
  },
  {
    title: "No Filters. No Fakes.",
    description:
      "Tired of curated success stories? So are we. FailForward is where founders drop the facade and share what really happened—from product flops to founder fights.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--gray-800),var(--gray-600))] text-white font-bold text-xl">
        Brutally Honest Insights
      </div>
    ),
  },
  {
    title: "Empower Future Founders",
    description:
      "By sharing your journey, you light the way for others. Your failed startup might be someone else's billion-dollar pivot. FailForward turns hindsight into someone else's foresight.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--yellow-400),var(--amber-500))] text-white font-bold text-xl">
        Fail. Share. Inspire.
      </div>
    ),
  },
  {
    title: "Anonymity, Guaranteed",
    description:
      "Not ready to go public with your story? No problem. FailForward supports anonymous sharing so you can speak freely without fear. Your truth, your terms.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white font-bold text-xl">
        Share Safely. Stay Anonymous.
      </div>
    ),
  },
  {
    title: "Contact Us",
    description:
      "This is an open source project, feel free to contribute, or direct email me at shauryasha090@gmail.com",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white font-bold text-xl">
        Let's Connect!.
      </div>
    ),
  },
];

export function Footer() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
