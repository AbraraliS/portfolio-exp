"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { imageCaption } from "@/../utils/project-helpers";

export default function Gallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);

  const move = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null
          ? null
          : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  // showModal gives us the focus trap, Escape and focus return.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
  }, [index]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
  };

  return (
    <>
      <ul className="gallery">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Enlarge ${name} screen: ${imageCaption(src)}`}
            >
              <span className="gallery-image">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 84vw"
                />
              </span>
              <span className="gallery-caption">{imageCaption(src)}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${name} screens`}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        onClick={(event) => {
          if (event.target === dialog.current) setIndex(null);
        }}
      >
        {index !== null && (
          <div
            className="lightbox-inner"
            onTouchStart={(event) => {
              touchStart.current = event.touches[0].clientX;
            }}
            onTouchEnd={onTouchEnd}
          >
            <div className="lightbox-image">
              <Image
                key={images[index]}
                src={images[index]}
                alt={`${name}: ${imageCaption(images[index])}`}
                fill
                sizes="100vw"
                priority
              />
            </div>
            <div className="lightbox-bar">
              <p aria-live="polite">
                {imageCaption(images[index])}, {index + 1} of {images.length}
              </p>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    aria-label="Previous image"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(1)}
                    aria-label="Next image"
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setIndex(null)}
                aria-label="Close"
              >
                <X aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
