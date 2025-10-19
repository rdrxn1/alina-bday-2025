function VideoContent({ videoSrc, caption }) {
  if (!videoSrc) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-xl border-2 border-white/12 bg-black/40 shadow-bezel">
      <video
        controls
        className="h-auto w-full"
      >
        <source src={videoSrc} />
        Your browser does not support the video element.
      </video>
      {caption && (
        <p className="border-t border-white/10 px-6 py-5 text-center font-terminal text-xl text-white/80">
          {caption}
        </p>
      )}
    </div>
  )
}

export default VideoContent
