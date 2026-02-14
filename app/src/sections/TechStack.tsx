"use client";

import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import {
    Code2,
    Cpu,
    Database,
    Globe,
    Layers,
    Layout,
    MessageSquare,
    Rocket,
    Server,
    Smartphone,
    Zap,
    Box,
    Palette,
    Terminal,
    Component
} from "lucide-react";

const techStack = [
    { name: "React", icon: Code2, color: "text-cyan" },
    { name: "Next.js", icon: Rocket, color: "text-white" },
    { name: "TypeScript", icon: Layout, color: "text-blue-500" },
    { name: "Three.js", icon: Box, color: "text-magenta" },
    { name: "Node.js", icon: Server, color: "text-green-500" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-400" },
    { name: "Tailwind CSS", icon: Palette, color: "text-cyan/80" },
    { name: "Framer Motion", icon: Zap, color: "text-purple-500" },
    { name: "GSAP", icon: Component, color: "text-green-400" },
    { name: "Vite", icon: Zap, color: "text-yellow-400" },
    { name: "Vercel", icon: Globe, color: "text-white" },
    { name: "Railway", icon: Terminal, color: "text-magenta/80" },
    { name: "Git", icon: Cpu, color: "text-orange-500" },
    { name: "Redux", icon: Layers, color: "text-purple-600" },
    { name: "Zod", icon: MessageSquare, color: "text-blue-600" },
];

export function TechStack() {
    return (
        <section className="py-12 bg-black/40 border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-8">
                    <motion.h3
                        className="text-white/40 text-xs font-mono uppercase tracking-[0.3em]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Powering my projects with
                    </motion.h3>
                </div>

                <Marquee pauseOnHover className="[--duration:30s]">
                    {techStack.map((tech) => (
                        <div
                            key={tech.name}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl glass border-white/5 hover:border-cyan/30 transition-colors group"
                        >
                            <tech.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", tech.color)} />
                            <span className="text-white font-medium whitespace-nowrap">{tech.name}</span>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}

import { cn } from "@/lib/utils";

export default TechStack;
