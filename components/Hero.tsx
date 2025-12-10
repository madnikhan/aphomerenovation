"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Calendar } from "lucide-react";

const videos = [
  "/Chimney_removal_professional_202512092026_quu.mp4",
  "/Painting__decoration_202512092026_e218o.mp4",
  "/Plastering__skimming_202512092026_5bshs.mp4",
  "/Partition_installation_create_202512092026_sy.mp4",
  "/Boarding__sealing_202512092026_5bfn6.mp4",
  "/plastering.mp4",
];

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only enable video after component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      video.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("loadeddata", handleLoadedData);

    // Preload next video
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    const nextVideo = document.createElement("video");
    nextVideo.src = videos[nextIndex];
    nextVideo.preload = "auto";

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [currentVideoIndex, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const video = videoRef.current;
    if (!video) return;

    // Update video source when index changes
    const source = video.querySelector("source");
    if (source) {
      source.src = videos[currentVideoIndex];
      video.load();
      setIsVideoLoaded(false);
    }
  }, [currentVideoIndex, isMounted]);

  return (
    <section className="relative bg-gradient-to-br from-[#202845] via-[#1a1f36] to-[#15192b] text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Video Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#15192b]/80 via-[#1a1f36]/70 to-[#0f1320]/80 z-10" />
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isMounted && isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay={isMounted}
          muted
          playsInline
          loop={false}
          preload="auto"
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
            Professional House
            <br />
            <span className="text-yellow-300">Refurbishment Services</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-lg">
            Transforming homes across the United Kingdom with expert craftsmanship,
            quality materials, and exceptional service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book Free Consultation
            </Link>
            <Link
              href="tel:+447466113917"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all inline-flex items-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Now
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm sm:text-base">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-yellow-300 font-bold text-2xl mr-2">✓</span>
              <span>Free Quotes</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-yellow-300 font-bold text-2xl mr-2">✓</span>
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-yellow-300 font-bold text-2xl mr-2">✓</span>
              <span>UK-Wide Service</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-yellow-300 font-bold text-2xl mr-2">✓</span>
              <span>10+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Indicator Dots - Always render to maintain structure */}
      <div 
        className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 ${
          isMounted ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideoIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentVideoIndex
                ? "bg-yellow-400 w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ArrowRight className="w-6 h-6 rotate-90 text-white/70" />
      </div>
    </section>
  );
}
