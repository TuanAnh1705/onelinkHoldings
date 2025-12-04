"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import NavBar from "./NavBar"

export default function HeroSection() {
    const logos = [
    { src: "/assets/Logo/cns-white.png", alt: "China Sourcing" },
    { src: "/assets/Logo/vns-white.png", alt: "Vietnam Sourcing" },
    { src: "/assets/Logo/OLMA WHITE 1.png", alt: "Onelink Marketing" },
    { src: "/assets/Logo/modul-white.png", alt: "Modular Link" },
]

    const isAnimating = useRef(false)

    const smoothScrollTo = (targetY: number) => {
        if (isAnimating.current) return
        isAnimating.current = true
        let currentY = window.scrollY

        const step = () => {
            currentY = currentY + (targetY - currentY) * 0.04
            window.scrollTo(0, currentY)
            if (Math.abs(targetY - currentY) > 0.5) {
                requestAnimationFrame(step)
            } else {
                window.scrollTo(0, targetY)
                isAnimating.current = false
            }
        }
        requestAnimationFrame(step)
    }

    const handleScroll = () => {
        const section = document.getElementById("our-group")
        if (section) {
            const targetY = section.getBoundingClientRect().top + window.scrollY
            smoothScrollTo(targetY)
        }
    }

    return (
        <section
            id="about"
            className="relative w-full min-h-[120vh] flex flex-col justify-start items-center text-center overflow-hidden rounded-b-[60px] font-sans"
        >
            {/* Background video */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/assets/Hero OLH.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            {/* Overlay texture */}
            <Image
                src="/assets/Rectangle 4.png"
                alt="Overlay texture"
                fill
                className="absolute inset-0 object-cover pointer-events-none z-10"
                style={{ opacity: 0.7 }}
                priority
            />
            <div className="absolute inset-0 bg-black/25 rounded-b-[60px]" />

            {/* Navbar */}
            <NavBar />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full h-full text-white px-4 sm:px-6 lg:px-8">
                {/* Logo chính (ẩn trên mobile) */}
                <div className="pt-24 sm:pt-28 lg:pt-32">
                    <Image
                        src="/assets/Logo/OLH white.png"
                        alt="OneLink Holdings"
                        width={150}
                        height={55}
                        className="mx-auto sm:w-[170px] sm:h-[62px] lg:w-[190px] lg:h-[70px] hidden sm:block"
                    />
                </div>

                {/* Khối nội dung bên dưới logo */}
                <div className="flex flex-col items-center mt-10 sm:mt-24 lg:mt-32">
                    {/* 3 con nhộng liquid glass */}
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
                        {logos.map((logo, idx) => (
                            <div
                                key={idx}
                                className="
                                    group relative flex items-center justify-center
                                    w-full max-w-[320px] sm:max-w-[360px] lg:min-w-[350px]
                                    h-[120px] sm:h-[140px] lg:min-h-[160px]
                                    rounded-full overflow-hidden
                                    border border-white/15
                                    shadow-[inset_0_0_14px_rgba(255,255,255,0.25),0_8px_22px_rgba(0,0,0,0.35)]
                                    transition-all duration-500
                                    hover:scale-105
                                    hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.35),0_6px_16px_rgba(0,0,0,0.45)]
                                "
                            >
                                {/* nền phóng to phần background phía sau */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: "url('/assets/Freepik_Video_4237696.mov')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        transform: "scale(5.0)",
                                        filter: "blur(3px) brightness(1.25) contrast(1.25)",
                                    }}
                                />

                                {/* lớp kính mờ */}
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-xs rounded-full" />

                                {/* logo */}
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={300}
                                    height={100}
                                    className="relative z-10 object-contain max-w-[90%] max-h-[90%]"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Subtitle */}
                    <p className="text-white max-w-3xl text-sm sm:text-lg leading-relaxed text-center mt-4 sm:mt-6 mb-4 sm:mb-6 px-2 font-normal whitespace-nowrap">
                        All united by a single mission: to help global businesses get
                        <span className="block font-bold text-white mt-2 text-xs sm:text-base whitespace-nowrap">
                            &quot;highest quality products at the best possible price&quot;
                        </span>
                    </p>

                    {/* CTA Button với liquid glass wrapper */}
                    <div
                        className="
                            group relative rounded-full p-[5px]
                            bg-white/3
                            border border-white/10
                            backdrop-blur-md backdrop-saturate-150
                            shadow-[inset_0_0_6px_rgba(255,255,255,0.2),0_6px_18px_rgba(0,0,0,0.35)]
                            overflow-hidden
                            transition-all duration-500
                            hover:scale-105
                            hover:shadow-[0_0_25px_8px_rgba(255,255,255,0.4),0_12px_32px_rgba(0,0,0,0.45)]
                            w-full sm:w-auto max-w-xs sm:max-w-none
                        "
                    >
                        <Button
                            onClick={handleScroll}
                            className="
                                relative px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-[#002C80]
                                text-white font-medium flex items-center justify-center gap-2
                                h-12 sm:h-16 text-lg sm:text-[22px] w-full
                                transition-colors duration-300 hover:bg-[#0040C1]
                            "
                        >
                            Learn more
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
