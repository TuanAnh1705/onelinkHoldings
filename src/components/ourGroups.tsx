"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const companies = [
    {
        name: "Vietnam Sourcing",
        logo: "/assets/New/New/Group 2-1.png",
        hoverImage: "/assets/Main 3 brands/Group 10.png",
        url: "https://vietnamsourcing.co",
    },
    {
        name: "China Sourcing",
        logo: "/assets/New/New/Group 2-2.png",
        hoverImage: "/assets/Main 3 brands/Group 1.png",
        url: "https://chinasourcing.co",
    },
    {
        name: "Onelink Marketing",
        logo: "/assets/New/New/OneLink Marketing.png",
        hoverImage: "/assets/Main 3 brands/Group 12.png",
        url: "https://onelinkmarketing.com",
    },
    {
        name: "ModularLink",
        logo: "/assets/New/New/Group 2.png",
        hoverImage: "/assets/Main 3 brands/Group 11.png",
    },
];

export default function OurGroup() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section id="our-group" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="text-center mb-12 leading-[1.1]">
                    <h2
                        className="inline-block text-[42px] sm:text-[60px] lg:text-[75px] font-normal tracking-wide bg-clip-text text-transparent whitespace-nowrap"
                        style={{
                            fontFamily: "SF Pro, sans-serif",
                            backgroundImage: "linear-gradient(to right, #003D82, #001936)",
                        }}
                    >
                        Our Group
                    </h2>
                    <br />
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="
                            text-[42px] sm:text-[60px] lg:text-[75px]
                            tracking-wide font-semibold
                            transition duration-300
                            whitespace-nowrap
                            "
                        style={{
                            fontFamily: "SF Pro Expanded, sans-serif",
                            color: "#36A9E1",
                        }}
                    >
                        of Companies
                    </motion.span>
                </div>

                {/* Companies */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
                    {companies.map((company, idx) => (
                        <a
                            key={idx}
                            href={company.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex items-center justify-center cursor-pointer p-6"
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Logo trắng mặc định */}
                            <Image
                                src={company.logo}
                                alt={company.name}
                                width={290}
                                height={120}
                                className="object-contain drop-shadow-lg scale-106 md:scale-123"
                            />

                            {/* Logo màu khi hover */}
                            <AnimatePresence>
                                {hovered === idx && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.6 }}
                                        animate={{ opacity: 1, scale: 1.05 }}
                                        exit={{ opacity: 0, scale: 0.6 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                        }}
                                        className="absolute inset-0 flex items-center justify-center z-10"
                                    >
                                        <Image
                                            src={company.hoverImage}
                                            alt={`${company.name} hover`}
                                            width={300}
                                            height={140}
                                            className="object-contain"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
