"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const menuItems = [
  { id: "about", label: "About us" },
  { id: "our-group", label: "Companies" },
  { id: "why", label: "Why OneLink" },
  { id: "contact", label: "Contact" },
]

export default function NavBar() {
  const [active, setActive] = useState(0)
  const [prevActive, setPrevActive] = useState(0)
  const [positions, setPositions] = useState<{ left: number; width: number }[]>([])
  const refs = useRef<(HTMLLIElement | null)[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const update = () => {
      setPositions(
        refs.current.map((el, idx) => {
          if (!el) return { left: 0, width: 0 }

          // Calculate the actual width needed when text is scaled
          const isActive = active === idx
          const baseWidth = el.offsetWidth
          const scaledWidth = isActive ? baseWidth * 1.1 : baseWidth

          return {
            left: el.offsetLeft - (scaledWidth - baseWidth) / 2,
            width: scaledWidth,
          }
        }),
      )
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [active]) // Added active dependency to recalculate when active changes

  useEffect(() => {
    const handleScroll = () => {
      setCompact(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (active !== prevActive) {
      setPrevActive(active)
    }
  }, [active])

  useEffect(() => {
    const sections = menuItems.map((item) => document.getElementById(item.id))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = menuItems.findIndex((item) => item.id === entry.target.id)
            if (idx !== -1 && idx !== active) {
              setPrevActive(active)
              setActive(idx)
            }
          }
        })
      },
      { threshold: 0.5 },
    )
    sections.forEach((sec) => sec && observer.observe(sec))
    return () => observer.disconnect()
  }, [active])

  //Khi click menu → scroll đến section
  const handleMenuClick = (idx: number) => {
    const targetId = menuItems[idx].id
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setActive(idx)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: compact ? 0 : 24,
          scaleX: compact ? 1 : 0.95,
        }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed left-1/2 -translate-x-1/2 z-50 ${compact
            ? "top-0 w-full rounded-none border-b border-black/20 bg-black/60 backdrop-blur-xs shadow-lg"
            : "max-w-5xl w-full rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_0_4px_rgba(255,255,255,0.15),0_4px_14px_rgba(0,0,0,0.25)]"
          }`}
      >
        <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 relative">
          {/* Logo */}
          <motion.div
            animate={{ scale: compact ? 0.85 : 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <Image
              src="/assets/Logo/OLH white.png"
              alt="OneLink Holdings"
              width={100}
              height={33}
              className="object-contain sm:w-[120px] sm:h-[40px]"
            />
          </motion.div>

          {/* Desktop Menu */}
          <ul className="relative hidden lg:flex items-center gap-8 text-white font-medium">
            {positions.length > 0 && (
              <motion.div
                initial={false}
                animate={{
                  x: positions[active]?.left ?? 0,
                  width: positions[active]?.width ?? 0,
                  scaleX:
                    Math.abs(positions[active]?.left - positions[prevActive]?.left) > 40
                      ? [1, 1.6, 0.9, 1]
                      : [1, 1.3, 0.95, 1],
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="absolute top-1/2 -translate-y-1/2 h-12 rounded-full 
                  bg-[#002C80] backdrop-blur-md 
                  border border-white/20 
                  shadow-[0_4px_20px_rgba(0,44,128,0.3),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.1)] 
                  before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none
                  after:absolute after:inset-[1px] after:rounded-full after:bg-gradient-to-b after:from-transparent after:to-white/5 after:pointer-events-none"
              />
            )}

            {menuItems.map((item, idx) => {
              const isActive = active === idx
              return (
                <li
                  key={item.id}
                  ref={(el) => {
                    refs.current[idx] = el
                  }}
                  onClick={() => handleMenuClick(idx)}
                  className="cursor-pointer px-3 py-1 relative z-10 transition-colors hover:text-blue-300 overflow-visible flex items-center justify-center"
                >
                  <motion.span
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-block whitespace-nowrap origin-center"
                  >
                    {item.label}
                  </motion.span>
                </li>
              )
            })}
          </ul>

          {/* Mobile Menu Button + CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
              aria-label="Toggle mobile menu"
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                className="w-6 h-0.5 bg-white block transition-all shadow-lg"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-6 h-0.5 bg-white block transition-all shadow-lg"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                className="w-6 h-0.5 bg-white block transition-all shadow-lg"
              />
            </button>

            <Button
              onClick={() => {
                const el = document.getElementById("get-in-touch")
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
              className="
                px-4 sm:px-6 py-2 rounded-full bg-[#002C80]
                text-white font-semibold
                transition-all duration-300
                hover:bg-[#0040C1] hover:shadow-[0_0_20px_6px_rgba(0,112,255,0.4)]
                h-10 sm:h-12 text-sm sm:text-[16px]
              "
            >
              Talk to Us!
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-md z-40 lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  onClick={() => handleMenuClick(idx)}
                  className={`text-2xl font-medium transition-colors px-4 py-2 ${active === idx ? "text-blue-300" : "text-white hover:text-blue-300"
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
