"use client";

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersect,
      observerOptions
    );

    const elements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-bottom"
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}