export function OptimizedImage({
  src,
  webpSrc,
  alt,
  className,
  loading,
  fetchPriority,
}) {
  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}
