import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TEXT_SELECTOR = [
  ".main-content h1",
  ".main-content h2",
  ".main-content h3",
  ".main-content h4",
  ".main-content h5",
  ".main-content h6",
  ".main-content p",
  ".main-content li",
  ".main-content label",
  ".main-content figcaption",
  ".footer h4",
  ".footer p",
  ".footer li",
  ".footer .footer-bottom"
].join(",");

export default function TextReveal() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return undefined;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const root = document.querySelector(".app-container");
    if (!root) return undefined;

    let observer;
    const revealElements = new Set();

    const shouldSkip = (element) => {
      if (!element.textContent?.trim()) return true;
      if (element.closest(".navbar, .bottom-nav, .mobile-menu, .home-media-modal, [data-no-text-reveal]")) return true;
      if (element.classList.contains("text-reveal-visible")) return true;
      return false;
    };

    const prepare = () => {
      const elements = Array.from(document.querySelectorAll(TEXT_SELECTOR)).filter((element) => !shouldSkip(element));

      elements.forEach((element, index) => {
        if (revealElements.has(element)) return;
        revealElements.add(element);
        element.classList.add("text-reveal-ready");
        element.style.setProperty("--text-reveal-delay", `${Math.min(index % 8, 7) * 45}ms`);

        if (reduceMotion || !observer) {
          element.classList.add("text-reveal-visible");
          return;
        }

        observer.observe(element);
      });
    };

    if (!reduceMotion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("text-reveal-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          root: null,
          threshold: 0.14,
          rootMargin: "0px 0px -8% 0px"
        }
      );
    }

    const mutationObserver = new MutationObserver(() => {
      window.requestAnimationFrame(prepare);
    });

    window.requestAnimationFrame(prepare);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);

  return null;
}
