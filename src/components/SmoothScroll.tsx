import { useEffect } from "react";
import Lenis from "lenis";

let activeLenis: Lenis | null = null;
let pendingScrollTimers: number[] = [];
let detachCancelListeners: (() => void) | null = null;

function cancelPendingScrollCorrections() {
  for (const id of pendingScrollTimers) {
    window.clearTimeout(id);
  }
  pendingScrollTimers = [];
  if (detachCancelListeners) {
    detachCancelListeners();
    detachCancelListeners = null;
  }
}

export function scrollToSection(elementId: string, offsetPx = -80) {
  cancelPendingScrollCorrections();

  // Ensure no modal/drawer scroll lock blocks the jump
  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "";
  }

  const performJump = (immediate = false) => {
    const el = document.getElementById(elementId);
    if (!el) return;

    if (activeLenis) {
      activeLenis.start();
      activeLenis.resize();
      activeLenis.scrollTo(el, {
        offset: offsetPx,
        duration: immediate ? 0.35 : 0.85,
        force: true,
      });
    } else {
      const targetTop = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY + offsetPx
      );
      window.scrollTo({
        top: targetTop,
        behavior: immediate ? "auto" : "smooth",
      });
    }
  };

  // Stop any auto-correction immediately if the user manually scrolls
  const onUserInput = () => cancelPendingScrollCorrections();
  window.addEventListener("wheel", onUserInput, { passive: true });
  window.addEventListener("touchstart", onUserInput, { passive: true });
  window.addEventListener("pointerdown", onUserInput, { passive: true });
  detachCancelListeners = () => {
    window.removeEventListener("wheel", onUserInput);
    window.removeEventListener("touchstart", onUserInput);
    window.removeEventListener("pointerdown", onUserInput);
  };

  // Wait briefly for drawer exit/unlock commit, then jump smoothly
  pendingScrollTimers.push(
    window.setTimeout(() => {
      performJump(false);
    }, 45)
  );

  // Recalculate once mid-flight and once on arrival in case lazy images above shifted page height
  const verifyLanding = () => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const rectTop = el.getBoundingClientRect().top;
    const desiredTop = Math.abs(offsetPx);
    if (Math.abs(rectTop - desiredTop) > 110) {
      performJump(true);
    }
  };

  pendingScrollTimers.push(window.setTimeout(verifyLanding, 420));
  pendingScrollTimers.push(
    window.setTimeout(() => {
      verifyLanding();
      cancelPendingScrollCorrections();
    }, 980)
  );
}

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Keep 100% native hardware-accelerated scroll on mobile / touch devices for fluid iOS & Android UX
    const isTouchOrMobile =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;

    if (prefersReduced || isTouchOrMobile) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    activeLenis = lenis;

    // Intercept same-page #anchor links so Lenis scrolls cleanly without fighting native CSS smooth scroll
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#" || hash.length < 2) return;
      const id = hash.slice(1);
      if (document.getElementById(id)) {
        event.preventDefault();
        scrollToSection(id, -80);
      }
    };
    document.addEventListener("click", handleAnchorClick);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelPendingScrollCorrections();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (activeLenis === lenis) {
        activeLenis = null;
      }
    };
  }, []);

  return null;
}
