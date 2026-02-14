"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, GraduationCap, Rocket, Search } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
    {
        id: 1,
        title: "SDE Intern",
        date: "May 2025 - July 2025",
        content: "Spearheaded development of an IPO web platform at Bluestock Fintech. Built 40+ UI components and optimized database performance by 35%.",
        category: "Experience",
        icon: Briefcase,
        relatedIds: [2],
        status: "completed" as const,
        energy: 100,
    },
    {
        id: 2,
        title: "B.Tech CSE",
        date: "Expected July 2026",
        content: "Pursuing Bachelor of Technology in Computer Science and Engineering at PSIT, Kanpur. Maintaining a CGPA of 7.4+.",
        category: "Education",
        icon: GraduationCap,
        relatedIds: [1, 3],
        status: "in-progress" as const,
        energy: 85,
    },
    {
        id: 3,
        title: "Project Development",
        date: "2024 - Present",
        content: "Implementing various production-grade web applications using React, Node.js, and PostgreSQL. Focused on scalability and UI/UX.",
        category: "Development",
        icon: Code2,
        relatedIds: [2, 4],
        status: "in-progress" as const,
        energy: 90,
    },
    {
        id: 4,
        title: "Future Aspirations",
        date: "Post 2026",
        content: "Looking to contribute to high-impact software engineering teams and innovate in the fintech and AI space.",
        category: "Future",
        icon: Rocket,
        relatedIds: [3],
        status: "pending" as const,
        energy: 40,
    },
    {
        id: 5,
        title: "Learning & Growth",
        date: "Continuous",
        content: "Constantly exploring new technologies like Three.js, GSAP, and advanced backend architectures to build premium web experiences.",
        category: "Learning",
        icon: Search,
        relatedIds: [2, 3],
        status: "in-progress" as const,
        energy: 75,
    },
];

export function Journey() {
    return (
        <section id="journey" className="relative py-20 bg-background overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-12">
                    <motion.span
                        className="inline-block px-4 py-1 rounded-full glass text-cyan text-sm font-mono mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Visual Journey
                    </motion.span>
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <span className="text-white">Interactive </span>
                        <span className="gradient-text">Timeline</span>
                    </motion.h2>
                    <motion.p
                        className="text-white/60 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Hover or click on the nodes to explore the milestones of my professional and educational path.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm overflow-hidden"
                >
                    <RadialOrbitalTimeline timelineData={timelineData} />
                </motion.div>
            </div>

            {/* Bottom transition */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        </section>
    );
}

export default Journey;
