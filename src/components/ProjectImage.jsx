import { useState } from "react";

export default function ProjectImage({
  src,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
}) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} project-media-fallback`}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
