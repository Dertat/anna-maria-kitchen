import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LINKS } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageProvider';

const GALLERY_SPANS = {
  'post-03.webp': 'row-span-2',
  'post-07.webp': 'row-span-2',
  'post-09.webp': 'row-span-2',
};

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
            span: GALLERY_SPANS[post.file] ?? '',
          }));
        setPosts(galleryPosts);
      })
      .catch(() => setPosts([]));
  }, [locale]);

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

        {posts.length > 0 && (
          <ScrollReveal
            stagger
            className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <a
                key={post.file}
                href={post.url}
                target="_blank"
                rel="noopener"
                className={`group relative overflow-hidden rounded-premium border border-border ${post.span}`}
              >
                <img
                  src={`/assets/instagram/${post.file}`}
                  alt={post.alt}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 via-primary/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm leading-snug text-primary-foreground">{post.alt}</p>
                </div>
              </a>
            ))}
          </ScrollReveal>
        )}

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
