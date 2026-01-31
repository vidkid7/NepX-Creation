"use client";

import FadeIn from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <FadeIn delay={0}>
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            {label}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2
          className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-heading font-bold",
            "bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
          )}
        >
          {title}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p
            className={cn(
              "mt-4 text-lg text-gray-400 max-w-2xl",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
