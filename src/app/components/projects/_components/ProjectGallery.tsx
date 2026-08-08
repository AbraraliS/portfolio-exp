"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

const ProjectGallery = ({ images, projectName }: ProjectGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedImage((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null,
    );
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedImage((prev) =>
      prev !== null ? (prev + 1) % images.length : null,
    );
  }, [images.length]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#050505] shadow-xl cursor-zoom-in"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image || "/placeholder/placeholder.png"}
              alt={`Blurred background for ${projectName}`}
              fill
              className="object-cover scale-110 blur-xl opacity-40"
            />
            <Image
              src={image || "/placeholder/placeholder.png"}
              alt={`${projectName} Screenshot ${index + 1}`}
              fill
              loading="lazy"
              className="object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 opacity-90 group-hover:opacity-100 relative z-10"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Maximize2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div className="md:hidden flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 no-scrollbar">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#050505] shadow-xl shrink-0 w-[90%] snap-center"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image || "/placeholder/placeholder.png"}
              alt={`Blurred background for ${projectName}`}
              fill
              className="object-cover scale-110 blur-xl opacity-40"
            />
            <Image
              src={image || "/placeholder/placeholder.png"}
              alt={`${projectName} Screenshot ${index + 1}`}
              fill
              loading="lazy"
              className="object-contain relative z-10"
            />
            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
              <span className="text-[10px] font-bold text-white">
                {index + 1}/{images.length}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-600 transition-all group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>

          {/* Navigation Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-8 z-[110]">
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="w-12 h-12 rounded-full bg-white/5 border-white/10 text-white hover:bg-red-600 hover:border-red-600 transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="w-12 h-12 rounded-full bg-white/5 border-white/10 text-white hover:bg-red-600 hover:border-red-600 transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>

          {/* Image Container */}
          <div
            className="relative w-full h-full p-4 sm:p-12 flex flex-col items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage]}
                alt={`Blurred background for ${projectName}`}
                fill
                className="object-cover scale-110 blur-xl opacity-40"
              />
              <Image
                src={images[selectedImage]}
                alt={`${projectName} Full View`}
                fill
                className="object-contain relative z-10"
                priority
              />
            </div>

            {/* Caption */}
            <div className="mt-6 text-center animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-white text-xl font-bold tracking-tight">
                {projectName}
              </h3>
              <p className="text-slate-400 mt-1 uppercase tracking-[0.2em] text-[10px] font-bold">
                Image {selectedImage + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
