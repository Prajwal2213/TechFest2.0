import { useEffect, useRef } from "react";

export default function Loader({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnd = () => {
      video.pause();
      video.removeAttribute("src");
      video.load(); // free memory
      onFinish();
    };

    video.addEventListener("ended", handleEnd);
    return () => video.removeEventListener("ended", handleEnd);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source src="/loader_video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
