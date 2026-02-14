"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: string;
    icon: LucideIcon | React.ElementType;
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
    className?: string;
}

export default function RadialOrbitalTimeline({
    timelineData,
    className,
}: RadialOrbitalTimelineProps) {
    const [activeItemId, setActiveItemId] = useState<number | null>(null);
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<string, boolean>>({});
    const [centerOffset] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const requestRef = useRef<number | null>(null);

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setActiveItemId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const getRelatedItems = (itemId: number): number[] => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const calculateNodePosition = (index: number, total: number) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = 220;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian) + centerOffset.x;
        const y = radius * Math.sin(radian) + centerOffset.y;

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(
            0.4,
            Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
        );

        return { x, y, angle, zIndex, opacity };
    };

    const centerViewOnNode = (nodeId: number) => {
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        if (nodeIndex === -1) return;

        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;
        setRotationAngle(270 - targetAngle);
    };

    const handleItemInteraction = (id: number) => {
        const isCurrentActive = activeItemId === id;

        if (isCurrentActive) {
            setActiveItemId(null);
            setAutoRotate(true);
            setPulseEffect({});
        } else {
            setActiveItemId(id);
            setAutoRotate(false);
            updatePulseAndCenter(id);
        }
    };

    const updatePulseAndCenter = (id: number) => {
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<string, boolean> = {};
        relatedItems.forEach((relId) => {
            newPulseEffect[relId.toString()] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
    };

    // Optimized rotation using requestAnimationFrame - using a ref for smoother updates and less React overhead
    const animate = (time: number) => {
        if (autoRotate) {
            setRotationAngle((prev) => (prev + 0.15) % 360);
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [autoRotate]);

    const isRelatedToActive = (itemId: number): boolean => {
        if (!activeItemId) return false;
        const relatedItems = getRelatedItems(activeItemId);
        return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status: TimelineItem["status"]): string => {
        switch (status) {
            case "completed":
                return "text-white bg-black border-white";
            case "in-progress":
                return "text-black bg-white border-black";
            case "pending":
                return "text-white bg-black/40 border-white/50";
            default:
                return "text-white bg-black/40 border-white/50";
        }
    };

    return (
        <div
            className={cn("w-full h-[800px] flex flex-col items-center justify-center bg-black/20 overflow-hidden relative", className)}
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                    style={{
                        perspective: "1000px",
                        transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
                    }}
                >
                    {/* Central Orb */}
                    <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan via-purple to-magenta animate-pulse-custom flex items-center justify-center z-10 shadow-glow">
                        <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping-custom opacity-70"></div>
                        <div
                            className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping-custom opacity-50"
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
                    </div>

                    {/* Orbit Path */}
                    <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5 pointer-events-none"></div>

                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = activeItemId === item.id;
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id.toString()];
                        const Icon = item.icon as LucideIcon;

                        const nodeStyle = {
                            transform: `translate(${position.x}px, ${position.y}px)`,
                            zIndex: isExpanded ? 200 : position.zIndex,
                            opacity: isExpanded ? 1 : position.opacity,
                        };

                        return (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    nodeRefs.current[item.id.toString()] = el;
                                }}
                                className="absolute transition-all duration-700 cursor-pointer"
                                style={nodeStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleItemInteraction(item.id);
                                }}
                            >
                                {/* Energy Aura */}
                                <div
                                    className={cn(
                                        "absolute rounded-full -inset-1 transition-opacity duration-500",
                                        isPulsing ? "animate-pulse-custom" : "opacity-0"
                                    )}
                                    style={{
                                        background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)`,
                                        width: `${item.energy * 0.4 + 40}px`,
                                        height: `${item.energy * 0.4 + 40}px`,
                                        left: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                                        top: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                                    }}
                                ></div>

                                {/* Node Icon */}
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform border-2",
                                        isExpanded
                                            ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-150"
                                            : isRelated
                                                ? "bg-white/50 text-black border-white animate-pulse-custom"
                                                : "bg-black text-white border-white/40"
                                    )}
                                >
                                    <Icon size={16} />
                                </div>

                                {/* Node Title */}
                                <div
                                    className={cn(
                                        "absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-wider transition-all duration-300 text-center w-32",
                                        isExpanded ? "text-white scale-125 opacity-100" : "text-white/30 opacity-80"
                                    )}
                                >
                                    {item.title}
                                </div>

                                {/* Info Card (Popup) */}
                                {isExpanded && (
                                    <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-black/90 backdrop-blur-lg border-white/20 shadow-2xl overflow-visible z-[300]">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/30"></div>
                                        <CardHeader className="pb-2 p-4">
                                            <div className="flex justify-between items-center">
                                                <Badge
                                                    variant="outline"
                                                    className={cn("px-2 py-0 text-[9px] uppercase tracking-tighter", getStatusStyles(item.status))}
                                                >
                                                    {item.status.replace('-', ' ')}
                                                </Badge>
                                                <span className="text-[10px] font-mono text-white/40">
                                                    {item.date}
                                                </span>
                                            </div>
                                            <CardTitle className="text-sm mt-2 text-white font-bold">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xs text-white/70 p-4 pt-0">
                                            <p className="leading-relaxed mb-4">{item.content}</p>

                                            {/* Energy Bar */}
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="flex items-center text-white/50">
                                                        <Zap size={10} className="mr-1 text-cyan" />
                                                        Progress / Energy
                                                    </span>
                                                    <span className="font-mono text-cyan">{item.energy}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-cyan via-purple to-magenta transition-all duration-1000"
                                                        style={{ width: `${item.energy}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Related Nodes */}
                                            {item.relatedIds.length > 0 && (
                                                <div className="mt-4 pt-3 border-t border-white/10">
                                                    <div className="flex items-center mb-2">
                                                        <Link size={10} className="text-white/40 mr-1" />
                                                        <h4 className="text-[9px] uppercase tracking-widest font-bold text-white/40">
                                                            Connected
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.relatedIds.map((relatedId) => {
                                                            const relatedItem = timelineData.find(
                                                                (i) => i.id === relatedId
                                                            );
                                                            return (
                                                                <Button
                                                                    key={relatedId}
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 px-2 py-0 text-[10px] rounded-none border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleItemInteraction(relatedId);
                                                                    }}
                                                                >
                                                                    {relatedItem?.title}
                                                                    <ArrowRight
                                                                        size={8}
                                                                        className="ml-1 text-white/40"
                                                                    />
                                                                </Button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
