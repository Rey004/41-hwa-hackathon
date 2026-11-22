"use client";

import Image from "next/image";
import { useState } from "react";

export interface PolishedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderColor?: string;
  priority?: boolean;
}

const PLACEHOLDER_COLORS = [
  "#f0fdfa",
  "#fefdf8",
  "#dcfce7",
  "#fce7ec",
  "#fef3c7",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function PolishedImage({
  src,
  alt,
  width,
  height,
  className,
  placeholderColor,
  priority = false,
}: PolishedImageProps) {
  const [error, setError] = useState(false);
  const color =
    placeholderColor ?? PLACEHOLDER_COLORS[hashString(src) % PLACEHOLDER_COLORS.length];

  if (error) {
    return (
      <div
        className={className}
        style={{
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
          borderRadius: "inherit",
        }}
      >
        <span className="text-xs font-heading font-semibold uppercase tracking-widest text-gray-400">
          Image coming soon
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setError(true)}
      style={{ objectFit: "cover", borderRadius: "inherit" }}
    />
  );
}
