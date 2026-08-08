"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { X, Maximize2 } from "lucide-react";
import { createPortal } from "react-dom";

interface ZoomableImageProps extends Omit<ImageProps, "onClick"> {
  containerClassName?: string;
  imageClassName?: string;
}

export function ZoomableImage({
  src,
  alt,
  containerClassName = "",
  imageClassName = "",
  ...props
}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div
        className={`relative w-full h-full cursor-zoom-in group overflow-hidden ${containerClassName}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsZoomed(true);
        }}
      >
        {/* Blurred Background Layer to prevent black bars */}
        <Image
          src={src}
          alt={`Blurred background for ${alt}`}
          fill
          className="object-cover scale-110 blur-xl opacity-40"
          {...props}
        />

        {/* Main Image */}
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain relative z-10 ${imageClassName}`}
          {...props}
        />

        {/* Hover Icon */}
        <div className="absolute inset-0 z-20 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Maximize2 className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {mounted &&
        isZoomed &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-600 transition-all group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            </button>
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 sm:p-12 animate-in zoom-in-95 duration-300 flex items-center justify-center">
              <Image
                src={src}
                alt={`Zoomed ${alt}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
