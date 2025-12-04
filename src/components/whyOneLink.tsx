"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WhyOneLinkSection() {
    return (
        <section
            id="why"
            className="
                relative overflow-hidden 
                min-h-screen 
                bg-black/60 
                flex items-center
                py-16 sm:py-24
            "
        >
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/e193e9b3-6b71-4af2-b56b-f9cc985f9b29.jpg"
                    alt="Why Onelink Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <div className="text-center flex flex-col items-center">
                        {/* Title */}
                        <div className="mb-8 leading-[1.1]">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="inline-block text-[50px] sm:text-[75px] font-normal tracking-wide bg-clip-text text-transparent"
                                style={{
                                    fontFamily: "SF Pro, sans-serif",
                                    backgroundImage: "linear-gradient(to right, #ffffff, #b3c7ff)",
                                }}
                            >
                                Why
                            </motion.h2>
                            <br />
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    textShadow: "0px 0px 3px rgba(255,255,255,0.6)",
                                    scale: 1.02,
                                    transition: { duration: 0.2, ease: "easeOut" },
                                }}
                                className="
                                    text-[50px] sm:text-[75px] 
                                    tracking-wide font-semibold
                                    transition duration-300
                                "
                                style={{
                                    fontFamily: "SF Pro Expanded, sans-serif",
                                    color: "#36A9E1",
                                }}
                            >
                                OneLink?
                            </motion.span>

                        </div>

                        {/* Paragraph */}
                        <p className="text-blue-100 mb-8 text-base leading-relaxed max-w-lg font-normal">
                            Our group of companies leverages on-the-ground teams, strong buying
                            power, and deep manufacturing and supply chain expertise to bring you
                            the best value for money across Asia.
                        </p>

                        {/* CTA */}
                        <a href="#get-in-touch">
                            <div
                                className="
                                    group relative rounded-full p-[5px]
                                    bg-white/3
                                    border border-white/10
                                    backdrop-blur-md backdrop-saturate-150
                                    shadow-[inset_0_0_4px_rgba(255,255,255,0.15),0_6px_18px_rgba(0,0,0,0.35)]
                                    overflow-hidden
                                    transition-all duration-500
                                    hover:scale-105
                                    hover:shadow-[0_0_25px_8px_rgba(255,255,255,0.4),0_12px_32px_rgba(0,0,0,0.45)]
                                "
                            >
                                <Button
                                    onClick={() => {
                                        const target = document.getElementById("get-in-touch");
                                        if (!target) return;

                                        const startY = window.scrollY;
                                        const endY = target.getBoundingClientRect().top + window.scrollY;
                                        const duration = 400;
                                        let startTime: number | null = null;

                                        const animateScroll = (time: number) => {
                                            if (!startTime) startTime = time;
                                            const progress = Math.min((time - startTime) / duration, 1);
                                            window.scrollTo(0, startY + (endY - startY) * progress);
                                            if (progress < 1) requestAnimationFrame(animateScroll);
                                        };

                                        requestAnimationFrame(animateScroll);
                                    }}
                                    className="
                                        relative z-10 px-10 py-4 rounded-full bg-[#002C80]
                                        text-white font-semibold flex items-center justify-center gap-2
                                        h-16 text-[22px]
                                        transition-colors duration-300 hover:bg-[#0040C1]
                                    "
                                >
                                    Talk To Us!
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        ↓
                                    </span>
                                    <span className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
                                </Button>
                            </div>
                        </a>
                    </div>

                    {/* Right */}
                    {/* Right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                        {[
                            { icon: "/assets/OneDrive_1_9-12-2025/line-md_map-marker.png", text: "Decades of Experience in Asia" },
                            { icon: "/assets/OneDrive_1_9-12-2025/line-md_person.png", text: "Local Teams on the Ground" },
                            { icon: "/assets/OneDrive_1_9-12-2025/material-symbols-light_verified-user-outline-rounded.png", text: "Global Quality Standards" },
                            { icon: "/assets/OneDrive_1_9-12-2025/solar_global-linear.png", text: "Trusted by Brands Worldwide" },
                        ].map((box, i) => (
                            <div
                                key={i}
                                className="
                                    bg-transparent
                                    rounded-[2rem]
                                    px-8 py-8
                                    border border-white
                                    text-center
                                    transition-all duration-300
                                    hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]
                                    flex flex-col items-center justify-center
                                    min-h-[150px]
                                    w-full max-w-[480px]  /* tăng bề ngang */
                                    mx-auto
                                "
                            >
                                <div
                                    className="
                                    w-14 h-14 rounded-full flex items-center justify-center mb-3
                                    border border-white/60 shadow-[0_0_10px_rgba(255,255,255,0.25)]
                                    transition-all duration-300 hover:scale-110
                                    "
                                >
                                    <Image src={box.icon} alt={box.text} width={28} height={28} />
                                </div>

                                <h4 className="text-white font-medium text-base sm:text-sm leading-snug text-center whitespace-nowrap">
                                    {box.text}
                                </h4>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
