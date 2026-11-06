"use client";

import { Play } from "lucide-react";
import { useState } from "react";

/** Loads YouTube's player only when someone asks for the video. */
export default function VideoFacade({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
          />
          <span className="video-play">
            <Play aria-hidden="true" /> Play {title}
          </span>
        </button>
      )}
    </div>
  );
}
