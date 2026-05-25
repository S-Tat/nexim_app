"use client";

import { useEffect } from "react";
import { useRouter } from "@/navigation";

export function AssessmentResultsClient() {
  const router = useRouter();
  useEffect(() => {
    router.replace({ pathname: "/result" });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] text-sm text-nexim-muted">
      Redirecting…
    </div>
  );
}
