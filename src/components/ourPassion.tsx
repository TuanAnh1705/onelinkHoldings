"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Hàm nội suy (lerp)
function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export default function OurPassion() {
  const ref = useRef<HTMLDivElement>(null);

  // Tiến trình cuộn
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Giá trị smooth (làm mượt)
  const smooth = useMotionValue(0);

  // Cập nhật mỗi frame bằng lerp
  useAnimationFrame(() => {
    smooth.set(lerp(smooth.get(), scrollYProgress.get(), 0.08));
  });

  // Biến đổi vị trí & opacity máy bay
  const x = useTransform(smooth, [0, 1], [-350, 350]);
  const y = useTransform(smooth, [0, 1], [300, -300]);
  const opacity = useTransform(smooth, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative flex justify-center py-24 bg-white font-sans">
      {/* Tiêu đề */}
      <h2
        className="
          absolute top-48 
          left-6 sm:left-48  
          text-7xl sm:text-7xl  
          bg-clip-text text-transparent z-20
          font-semibold
        "
        style={{
          backgroundImage: "linear-gradient(to right, #003D82, #001936)",
        }}
      >
        Our Passion
      </h2>
        
      <div className="relative w-[90%] max-w-6xl rounded-3xl bg-gradient-to-b from-white to-[#f8f9fa] shadow-lg p-10 overflow-hidden mt-50">
        <Image
          src="/assets/Group 8.png"
          alt="City Skyline"
          fill
          className="object-cover opacity-40 pointer-events-none z-0"
          priority
        />
        <div className="relative z-10 max-w-xl text-gray-800 mt-10">
          <p className="text-sm sm:text-lg leading-relaxed font-normal">
            We&apos;ve spent over a decade building deep relationships with suppliers
            &amp; teams across Asia. Our team understands the culture, language
            and pace of doing business in the region.
          </p>
          <p className="mt-4 text-sm sm:text-lg leading-relaxed font-normal">
            This insight allows us to deliver{" "}
            <strong>
              <span className="text-[#003D82] font-medium">
                not only high-quality products, but also smoother, smarter supply
                chains.
              </span>
            </strong>
          </p>
        </div>
      </div>

      <motion.div
        style={{ x, y, opacity }}
        className="
          absolute left-1/2 top-1/2 
          w-[220px] h-[140px] sm:w-[480px] sm:h-[300px] 
          -translate-y-1/2 translate-x-[30px] sm:translate-x-[70px] 
          z-30
        "
      >
        <Image
          src="/assets/an.png"
          alt="Airplane"
          width={480}
          height={300}
          className="object-contain"
          priority
        />
      </motion.div>
    </section>
  );
}