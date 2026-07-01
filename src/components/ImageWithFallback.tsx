"use client";

import { useState, type ImgHTMLAttributes } from "react";

interface ImageWithFallbackProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onError"> {
  fallbackSrc?: string;
  fallbackElement?: React.ReactNode;
  fetchPriority?: "high" | "low" | "auto";
}

export function ImageWithFallback({
  src,
  fallbackSrc,
  fallbackElement,
  alt,
  className,
  loading = "lazy",
  fetchPriority,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [fallbackTried, setFallbackTried] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleError = () => {
    if (!fallbackTried && fallbackSrc && fallbackSrc !== imgSrc) {
      setFallbackTried(true);
      setImgSrc(fallbackSrc);
    } else {
      setImageFailed(true);
    }
  };

  if (imageFailed && fallbackElement) {
    return <>{fallbackElement}</>;
  }

  if (imageFailed) {
    return null;
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={handleError}
      className={className}
      {...rest}
    />
  );
}
