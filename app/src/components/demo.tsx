"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function HeroScrollDemo() {
    return (
        <div className="flex flex-col overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold text-white">
                            Unleash the power of <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none gradient-text">
                                Scroll Animations
                            </span>
                        </h1>
                    </>
                }
            >
                <img
                    src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2400&auto=format&fit=crop"
                    alt="Hero Illustration"
                    className="mx-auto rounded-2xl object-cover h-full object-left-top w-full"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}

export default HeroScrollDemo;
