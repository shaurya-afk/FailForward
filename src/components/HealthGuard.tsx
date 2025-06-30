"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkHealth } from "@/data/api";
import Loading from "@/components/Loading";

export default function HealthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkHealth()
      .then(setHealth)
      .catch(() => setHealth(false))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && !health && pathname !== "/server-down") {
      router.replace("/server-down");
    }
  }, [loading, health, router, pathname]);

  if (loading) {
    return <Loading/>;
}

  return <>{children}</>;
}
