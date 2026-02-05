const ComingSoonCard = () => {
  return (
    <div className="w-full flex items-center justify-center py-20 h-screen">
      <div
        className="
          relative max-w-md w-full
          rounded-3xl
          border border-cyan-400/20
          bg-black/60 backdrop-blur-2xl
          px-10 py-14
          text-center
          shadow-[0_0_80px_-20px_rgba(34,211,238,0.6)]
          mt-10
          
        "
      >
        {/* Glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-indigo-500/20 blur-2xl opacity-70 -z-10" />

        {/* Badge */}
        <span className="inline-block mb-4 px-4 py-1 text-xs font-bold tracking-widest text-cyan-400 border border-cyan-400/30 rounded-full">
          DSU TECHFEST 1.0
        </span>

        {/* Title */}
        <h2 className="text-4xl font-extrabold tracking-wide text-white mb-3">
          Coming Soon
        </h2>

        {/* Subtitle */}
        <p className="text-white/70 text-sm leading-relaxed mb-8">
          Something exciting is in the works.  
          Stay tuned for updates and announcements.
        </p>

        {/* Divider */}
        <div className="w-16 h-[2px] mx-auto mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />

        {/* Date / Status */}
        <p className="text-cyan-400 font-semibold tracking-widest text-sm mb-6">
          LAUNCHING SOON....
        </p>

        {/* Button */}
        <button
          disabled
          className="
            w-full py-3 rounded-xl
            bg-cyan-500/10
            border border-cyan-400/30
            text-cyan-400 font-bold tracking-wide
            cursor-not-allowed
            hover:bg-cyan-500/20
            transition
          "
        >
          Stay Tuned
        </button>
      </div>
    </div>
  );
};

export default ComingSoonCard;
