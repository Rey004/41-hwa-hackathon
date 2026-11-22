"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface PolishedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
}

export const PolishedImage: React.FC<PolishedImageProps> = ({
  src,
  alt,
  fallbackText = "PAWPATH",
  className,
  containerClassName,
  ...props
}) => {
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#eef5f0] flex items-center justify-center",
        containerClassName
      )}
    >
      {!error ? (
        <Image
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className={cn(
            "object-cover transition-transform duration-700 hover:scale-105",
            className
          )}
          {...props}
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center text-emerald-800">
          <span className="font-heading font-black text-sm tracking-wider uppercase">
            {fallbackText}
          </span>
          <span className="text-[10px] text-emerald-600 mt-0.5">Interactive Training Mat</span>
        </div>
      )}
    </div>
  );
};
