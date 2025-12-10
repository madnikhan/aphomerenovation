"use client";

import { useEffect } from "react";

export function useAppManifest() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Remove any existing manifest links
    const existingManifests = document.querySelectorAll('link[rel="manifest"]');
    existingManifests.forEach((link) => link.remove());

    // Add app manifest link to head
    const link = document.createElement("link");
    link.rel = "manifest";
    link.href = "/app-manifest.json";
    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount
      const appManifest = document.querySelector('link[rel="manifest"][href="/app-manifest.json"]');
      if (appManifest) {
        document.head.removeChild(appManifest);
      }
    };
  }, []);
}

