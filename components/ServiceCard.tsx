"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight, Play, Pause } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  image?: string;
  video?: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  image,
  video,
}: ServiceCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailVideoRef = useRef<HTMLVideoElement>(null);

  // Generate thumbnail from video first frame
  useEffect(() => {
    if (!video || thumbnailUrl) return;

    const thumbnailVideo = document.createElement("video");
    thumbnailVideo.src = video;
    thumbnailVideo.crossOrigin = "anonymous";
    thumbnailVideo.muted = true;
    thumbnailVideo.currentTime = 0.5; // Get frame at 0.5 seconds

    const handleLoadedData = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = thumbnailVideo.videoWidth || 800;
        canvas.height = thumbnailVideo.videoHeight || 600;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          ctx.drawImage(thumbnailVideo, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          setThumbnailUrl(dataUrl);
        }
      } catch (error) {
        console.log("Error generating thumbnail:", error);
      }
    };

    thumbnailVideo.addEventListener("loadeddata", handleLoadedData);
    thumbnailVideo.addEventListener("seeked", handleLoadedData);

    return () => {
      thumbnailVideo.removeEventListener("loadeddata", handleLoadedData);
      thumbnailVideo.removeEventListener("seeked", handleLoadedData);
    };
  }, [video, thumbnailUrl]);

  // Handle video play/pause
  const handlePlayPause = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!video || !videoRef.current) return;

    if (!showVideo) {
      // First click - load and play video
      setShowVideo(true);
      // Wait for video element to be ready
      setTimeout(async () => {
        try {
          await videoRef.current?.play();
          setIsVideoPlaying(true);
        } catch (error) {
          console.log("Video play error:", error);
        }
      }, 100);
    } else {
      // Toggle play/pause
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        try {
          await videoRef.current.play();
          setIsVideoPlaying(true);
        } catch (error) {
          console.log("Video play error:", error);
        }
      }
    }
  };

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !showVideo) return;

    const handlePlaying = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);
    const handleEnded = () => setIsVideoPlaying(false);

    videoElement.addEventListener("playing", handlePlaying);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("playing", handlePlaying);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [showVideo]);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {(video || image) && (
        <div 
          className="w-full h-48 overflow-hidden bg-gray-100 relative cursor-pointer"
          onClick={handlePlayPause}
        >
          {video ? (
            <>
              {/* Thumbnail/Poster - shown when video is not playing */}
              {!showVideo || !isVideoPlaying ? (
                <div className="absolute inset-0 w-full h-full">
                  {/* Video thumbnail or gradient background */}
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#e8eaf0] to-[#d1d5e1]"></div>
                  )}
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center group-hover:bg-[#202845] group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Play className="w-8 h-8 text-[#202845] group-hover:text-white ml-1" />
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Video element - only rendered when user clicks play */}
              {showVideo && (
                <video
                  ref={videoRef}
                  src={video}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onPlaying={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                />
              )}

              {/* Pause button overlay when video is playing - shows on hover */}
              {isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Pause className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center text-[#202845] font-semibold hover:text-[#1a1f36] transition-colors group-hover:translate-x-2 transition-transform"
        >
          Learn More
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

