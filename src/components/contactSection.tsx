"use client";

import { useState } from "react"; 
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MousePointerClick } from "lucide-react";

// ✅ Thêm interface cho FormData
interface FormData {
    firstname: string;
    phone: string;
    website: string;
    email: string;
    company: string;
    message: string;
}

export default function ContactSection() {
    // ✅ Thêm state management
    const [formData, setFormData] = useState<FormData>({
        firstname: "",
        phone: "",
        website: "",
        email: "",
        company: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    // ✅ Thêm handler cho input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ✅ Thêm handler cho form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('https://onelinkholdings.com/api/hubspot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                // Reset form
                setFormData({
                    firstname: "",
                    phone: "",
                    website: "",
                    email: "",
                    company: "",
                    message: "",
                });
            } else {
                setSubmitStatus('error');
                console.error('Error:', result.error);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Network error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="get-in-touch"
            className="relative min-h-screen overflow-hidden flex items-center"
        >
            {/* Background video - giữ nguyên */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/assets/mapVideo.mp4" type="video/mp4" />
            </video>

            {/* Overlay layers - giữ nguyên */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-[#000730]/70" />

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 relative z-10 w-full">
                <div className="relative w-full max-w-5xl mx-auto my-8 rounded-4xl p-6 sm:p-10 bg-white/4 border border-white/10 backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_0_6px_rgba(255,255,255,0.15),0_6px_18px_rgba(0,0,0,0.35)] overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-black/5 rounded-4xl pointer-events-none" />

                    <div className="relative z-10">
                        {/* Title + subtitle - giữ nguyên */}
                        <div className="mb-8 text-left">
                            <div className="leading-[1.05]">
                                <motion.h2
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="inline-block text-[34px] sm:text-[55px] lg:text-[75px] font-normal tracking-wide bg-clip-text text-transparent whitespace-nowrap"
                                    style={{
                                        fontFamily: "SF Pro, sans-serif",
                                        backgroundImage: "linear-gradient(to right, #ffffff, #b3c7ff)",
                                    }}
                                >
                                    Get in touch
                                </motion.h2>

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
                                    className="ml-2 text-[34px] sm:text-[55px] lg:text-[75px] tracking-wide font-semibold whitespace-nowrap transition duration-300"
                                    style={{
                                        fontFamily: "SF Pro Expanded, sans-serif",
                                        color: "#36A9E1",
                                    }}
                                >
                                    today
                                </motion.span>
                            </div>

                            <p className="mt-6 text-[25px] text-blue-200 max-w-2xl">
                                Fill in the form
                            </p>

                            {/* ✅ Thêm status messages */}
                            {submitStatus === 'success' && (
                                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
                                    Cảm ơn bạn! Thông tin đã được gửi thành công.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                                    Có lỗi xảy ra. Vui lòng thử lại sau.
                                </div>
                            )}
                        </div>

                        {/* ✅ Form - chỉ thêm onSubmit và các props cho Input */}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Left column */}
                            <div className="flex flex-col gap-6 w-full">
                                <div className="w-full">
                                    <label className="block text-white text-sm mb-2">
                                        Name *
                                    </label>
                                    <Input
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        placeholder="Enter name"
                                        required
                                        className="!bg-transparent !border-0 !border-b-2 !border-[#007AFF] !text-white placeholder-white/50 focus-visible:!ring-0 focus-visible:!border-[#007AFF]"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-white text-sm mb-2">
                                        Phone Number
                                    </label>
                                    <Input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter phone number"
                                        className="!bg-transparent !border-0 !border-b-2 !border-[#007AFF] !text-white placeholder-white/50 focus-visible:!ring-0 focus-visible:!border-[#007AFF]"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-white text-sm mb-2">
                                        Website URL
                                    </label>
                                    <Input
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        placeholder="Enter website URL"
                                        className="!bg-transparent !border-0 !border-b-2 !border-[#007AFF] !text-white placeholder-white/50 focus-visible:!ring-0 focus-visible:!border-[#007AFF]"
                                    />
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="flex flex-col gap-6 w-full">
                                <div className="w-full">
                                    <label className="block text-white text-sm mb-2">
                                        Email *
                                    </label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter email"
                                        required
                                        className="!bg-transparent !border-0 !border-b-2 !border-[#007AFF] !text-white placeholder-white/50 focus-visible:!ring-0 focus-visible:!border-[#007AFF]"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-white text-sm mb-2">
                                        Company Name
                                    </label>
                                    <Input
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        placeholder="Enter company name"
                                        className="!bg-transparent !border-0 !border-b-2 !border-[#007AFF] !text-white placeholder-white/50 focus-visible:!ring-0 focus-visible:!border-[#007AFF]"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-white text-sm mb-2">
                                        Message
                                    </label>
                                    <Input
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Message"
                                        className="!bg-transparent !border-0 !border-b-2 !border-[#007AFF] !text-white placeholder-white/50 resize-none focus-visible:!ring-0 focus-visible:!border-[#007AFF]"
                                    />
                                </div>
                            </div>

                            {/* Submit button - ✅ chỉ thêm type="submit" và disabled */}
                            <div className="md:col-span-2 flex justify-center mt-6">
                                <div className="group relative rounded-full p-[5px] bg-white/3 border border-white/10 backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_0_4px_rgba(255,255,255,0.15),0_6px_18px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_25px_8px_rgba(255,255,255,0.4),0_12px_32px_rgba(0,0,0,0.45)]">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="relative z-10 px-10 py-4 rounded-full bg-[#002C80] text-white font-semibold flex items-center justify-center gap-2 h-16 text-[22px] transition-colors duration-300 hover:bg-[#0040C1] disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Đang gửi...' : 'Submit'}
                                        <MousePointerClick className="w-6 h-6" />
                                        <span className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
