"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    sender: "user" | "bot";
    text: string;
};

export default function ChatWidget() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const chatRef = useRef<HTMLDivElement | null>(null);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("/api/gemini", {
                message: userMsg.text,
            });

            const botMsg: Message = {
                sender: "bot",
                text: res.data.reply || "No response.",
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            const errorMsg: Message = {
                sender: "bot",
                text: "Error calling Gemini API.",
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    // Auto scroll khi có tin nhắn mới
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading]);

    // Click outside để đóng chat
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="fixed bottom-28 right-8 z-50">
            {/* Nút tròn mở chat */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-15 h-15 rounded-full bg-white/10 text-white shadow-md flex items-center justify-center fixed bottom-24 right-5"
                >
                    <Image
                        src="/assets/robot.png"
                        alt="Open chat"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </button>
            )}

            {/* Khung chat có hiệu ứng */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatRef}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="w-80 h-[480px] bg-white border shadow-2xl rounded-2xl flex flex-col fixed bottom-24 right-5"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-4 py-2 bg-[#36A9E1] text-white rounded-t-2xl">
                            <span>AI Assistant</span>
                            <button onClick={() => setIsOpen(false)}>✖</button>
                        </div>

                        {/* Nội dung chat */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-3">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {/* Avatar bot */}
                                    {msg.sender === "bot" && (
                                        <Image
                                            src="/assets/robot.png"
                                            alt="Bot"
                                            width={28}
                                            height={28}
                                            className="rounded-full"
                                        />
                                    )}

                                    {/* Bubble */}
                                    <div
                                        className={`px-3 py-2 rounded-lg max-w-[70%] whitespace-pre-wrap break-words ${msg.sender === "user"
                                                ? "bg-[#36A9E1] text-white"
                                                : "bg-gray-200"
                                            }`}
                                    >
                                        {msg.sender === "bot" ? (
                                            <div className="prose prose-sm">
                                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                            </div>
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/assets/robot.png"
                                        alt="Bot typing"
                                        width={28}
                                        height={28}
                                        className="rounded-full"
                                    />
                                    <span className="inline-block px-3 py-2 rounded-lg bg-gray-200 animate-pulse">
                                        Typing...
                                    </span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="flex gap-2 p-2 border-t">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Type your question..."
                                className="flex-1 border rounded px-3 py-2"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-[#36A9E1] text-white px-4 py-2 rounded"
                                disabled={loading}
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
