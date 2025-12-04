"use client";

import React from "react";
import Image from "next/image";

const contacts = [
    {
        name: "OneLink Holdings",
        flag: "/assets/Country Flag/Rectangle 21.png",
        email: "sam@onelinkholdings.com",
        contact: "Sam Sheehan",
    },
    {
        name: "China Sourcing Co",
        flag: "/assets/Country Flag/Rectangle 20.png",
        email: "bheki@chinasourcing.co",
        contact: "Bheki Mhlanga",
    },
    {
        name: "Vietnam Sourcing Co",
        flag: "/assets/Country Flag/Rectangle 22.png",
        email: "tom@vietnamsourcing.co",
        contact: "Tom Daniels",
    },
    {
        name: "ModularLink",
        flag: "/assets/Country Flag/Rectangle 23.png",
        email: "sam@onelinkholdings.com",
        contact: "Sam Sheehan",
    },
];

export default function FooterContact() {
    return (
        <footer id="contact" className="bg-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="text-center mb-12">
                    <h3
                        className="
                            leading-tight
                            text-[34px] sm:text-[55px] lg:text-[75px]
                            tracking-wide
                            whitespace-nowrap
                            "
                    >
                        <span
                            className="bg-clip-text text-transparent font-normal"
                            style={{
                                backgroundImage: "linear-gradient(to right, #003D82, #001936)",
                            }}
                        >
                            Contact
                        </span>{" "}
                        <span
                            className="font-semibold text-[#36A9E1]"
                            style={{ fontFamily: "SF Pro Display, sans-serif" }}
                        >
                            us
                        </span>
                    </h3>
                </div>
                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-base mt-12">
                    {contacts.map((item, i) => (
                        <div
                            key={i}
                            className={`relative ${i !== contacts.length - 1
                                ? "md:border-r-2 md:border-[#007AFF]"
                                : ""
                                } pr-10`}
                        >
                            {/* Company + Flag */}
                            <div className="flex items-center mb-4">
                                <h4
                                    className="text-gray-800 font-semibold text-sm md:text-base whitespace-nowrap"
                                    style={{ fontFamily: "SF Pro Display, sans-serif" }}
                                >
                                    {item.name}
                                </h4>

                                <div className="ml-4 w-12 h-8 relative flex-shrink-0">
                                    <Image
                                        src={item.flag}
                                        alt={`${item.name} flag`}
                                        fill
                                        className="object-contain rounded-xl bg-white"
                                    />
                                </div>

                            </div>

                            {/* Email */}
                            <div className="flex items-center mb-1">
                                <span
                                    className="w-2 h-2 rounded-full mr-2"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to right, #077EFF, #162B48)",
                                    }}
                                />
                                <span
                                    className="font-medium bg-clip-text text-transparent"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to right, #077EFF, #162B48)",
                                    }}
                                >
                                    Email:
                                </span>
                            </div>
                            <p className="mb-3 text-gray-600">{item.email}</p>

                            {/* Contact Point */}
                            <div className="flex items-center mb-1">
                                <span
                                    className="w-2 h-2 rounded-full mr-2"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to right, #077EFF, #162B48)",
                                    }}
                                />
                                <span
                                    className="font-medium bg-clip-text text-transparent"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to right, #077EFF, #162B48)",
                                    }}
                                >
                                    Contact Point:
                                </span>
                            </div>
                            <p className="text-gray-600">{item.contact}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-300 pt-6 mt-20 flex flex-col md:flex-row justify-between text-sm text-gray-500">
                    <p>© 2025 OneLink – All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Site created by OneLink Holdings</p>
                </div>
            </div>
        </footer>
    );
}
