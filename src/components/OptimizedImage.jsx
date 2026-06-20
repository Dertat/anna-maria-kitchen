export function OptimizedImage({
  src,
  srcSet,
  sizes,
  webpSrc,
  alt,
  className,
  loading,
  fetchPriority,
}) {
  const resolvedSrcSet = srcSet || webpSrc;

  return (
    <img
      src={src}
      srcSet={resolvedSrcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}
