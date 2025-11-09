"use client";

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

type ImageWithFallbackProps = ImageProps & {
  fallbackAlt?: string;
};

export function ImageWithFallback({
  src,
  alt,
  fallbackAlt = 'Error loading image',
  unoptimized,
  ...rest
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState<ImageProps['src']>(src);
  const [imageAlt, setImageAlt] = useState(alt);

  useEffect(() => {
    setImageSrc(src);
    setImageAlt(alt);
  }, [src, alt]);

  const isDataUrl = typeof imageSrc === 'string' && imageSrc.startsWith('data:');

  return (
    <Image
      {...rest}
      src={imageSrc}
      alt={imageAlt}
      unoptimized={unoptimized ?? isDataUrl}
      onError={() => {
        if (!isDataUrl) {
          setImageSrc(ERROR_IMG_SRC);
          setImageAlt(fallbackAlt);
        }
      }}
    />
  );
}
