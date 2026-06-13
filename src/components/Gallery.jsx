import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ZoomParallax } from '@/components/ZoomParallax';
import { buttonVariants } from '@/components/ui/button';
import { LINKS } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageProvider';
import { trackOutboundLink } from '@/lib/analytics';

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

  const previewPosts = useMemo(() => posts.slice(0, 4), [posts]);

  return (
    <section id="gallery">
      <div className="bg-secondary/50">
        <div className="mx-auto flex min-h-[12rem] max-w-7xl items-center justify-center px-6 py-16 sm:min-h-[14rem] lg:min-h-[16rem] lg:px-8 lg:py-20">
          <ScrollReveal className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <span className="pl-[0.3em] text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {t('gallery.eyebrow')}
            </span>
            <h2 className="mt-3 w-full text-center text-balance font-serif text-4xl font-semibold text-primary sm:text-5xl">
              {t('gallery.title')}
            </h2>
            <p className="mt-4 w-full max-w-xl text-center text-pretty leading-relaxed text-muted-foreground">
              {t('gallery.subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </div>

      {parallaxImages.length > 0 && <ZoomParallax images={parallaxImages} />}

      <div className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <ScrollReveal className="flex justify-center">
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener"
              onClick={() => trackOutboundLink(LINKS.instagram, 'gallery_instagram')}
              className="group block w-full max-w-2xl overflow-hidden rounded-premium border border-border bg-card shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10"
            >
            {previewPosts.length > 0 && (
              <div className="grid grid-cols-4 gap-px bg-border">
                {previewPosts.map((post) => (
                  <div key={post.file} className="relative aspect-square overflow-hidden">
                    <img
                      src={`/assets/instagram/parallax/${post.file}`}
                      alt=""
                      aria-hidden
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10" />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center px-8 py-8 text-center sm:px-10 sm:py-9">
              <span className="pl-[0.3em] text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Instagram
              </span>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-primary sm:text-3xl">
                {t('gallery.instagramTitle')}
              </h3>
              <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                {t('gallery.instagramSubtitle')}
              </p>
              <span
                className={buttonVariants({
                  size: 'lg',
                  className:
                    'mt-6 rounded-full px-6 transition-transform duration-300 group-hover:scale-[1.02]',
                })}
              >
                <Instagram className="size-4" />
                @{LINKS.instagramUsername}
                <ArrowUpRight className="size-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
