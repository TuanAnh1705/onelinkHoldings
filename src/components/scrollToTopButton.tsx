"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // khi scroll quá 300px thì hiện nút
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={handleScrollTop}
          className="
            fixed bottom-6 right-6 z-50
            w-14 h-14
            rounded-full shadow-lg
            hover:scale-110 transition-transform duration-300
          "
        >
          <Image
            src="/assets/chuot.png"
            alt="Scroll to top"
            width={56}
            height={56}
            className="object-contain"
          />
        </button>
      )}
    </>
  );
}
