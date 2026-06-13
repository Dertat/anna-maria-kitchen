import { useEffect, useMemo, useState } from 'react';
import { Instagram } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ZoomParallax } from '@/components/ZoomParallax';
import { LINKS } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageProvider';

const GALLERY_LIMIT = 16;

export function Gallery() {
  const { t, locale } = useLanguage();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/assets/instagram/posts.json')
      .then((res) => res.json())
      .then((data) => {
        const galleryPosts = data.posts
          .filter((post) => post.gallery)
          .map((post) => ({
            ...post,
            alt: post.captions?.[locale] ?? post.caption ?? 'Anna-Maria kitchen',
          }));
        setPosts(galleryPosts);
      })
      .catch(() => setPosts([]));
  }, [locale]);

  const parallaxImages = useMemo(
    () =>
      posts.slice(0, GALLERY_LIMIT).map((post) => ({
        src: `/assets/instagram/parallax/${post.file}`,
        fallback: `/assets/instagram/${post.file}`,
        alt: post.alt,
      })),
    [posts],
  );

  return (
    <section id="gallery" className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {t('gallery.eyebrow')}
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-primary sm:text-5xl">
            {t('gallery.title')}
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {t('gallery.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      {parallaxImages.length > 0 && (
        <div className="mt-14">
          <ZoomParallax images={parallaxImages} />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="mt-10 flex justify-center">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <Instagram className="size-4" />
            {t('gallery.instagramCta')}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
