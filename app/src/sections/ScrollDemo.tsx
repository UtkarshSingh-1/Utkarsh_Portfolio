"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";

export function ScrollDemo() {
    return (
        <section id="proof" className="bg-background relative py-20 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />

            <ContainerScroll
                titleComponent={
                    <>
                        <motion.span
                            className="inline-block px-4 py-1 rounded-full glass text-cyan text-sm font-mono mb-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            Interactive Experience
                        </motion.span>
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
                            <span className="text-white">Immersive </span>
                            <span className="gradient-text leading-tight">Interaction</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base mt-4">
                            Watch the components come to life as you explore the interface. High-fidelity animations meet performant 3D experiences.
                        </p>
                    </>
                }
            >
                <img
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
                    alt="hero"
                    className="mx-auto rounded-2xl object-cover h-full object-left-top w-full"
                    draggable={false}
                />
            </ContainerScroll>
        </section>
    );
}

export default ScrollDemo;
