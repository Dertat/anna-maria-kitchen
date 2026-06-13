import { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Analytics } from './components/Analytics';
import { JsonLd } from './components/JsonLd';
import { BackToTop } from './components/BackToTop';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Curtain } from './components/Curtain';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { Steps } from './components/Steps';
import { WeeklyMenu } from './components/WeeklyMenu';
import { useSmoothAnchors } from './hooks/useSmoothAnchors';
import { ScrollRevealProvider } from './hooks/useScrollReveal';
import { INTRO_SEEN_KEY } from './lib/storageKeys';
import { useTheme } from './theme/ThemeProvider';

function hasSeenIntro() {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export default function App() {
  const { theme } = useTheme();
  const [pageReady, setPageReady] = useState(hasSeenIntro);
  const [showCurtain, setShowCurtain] = useState(() => !hasSeenIntro());

  const onIntroReady = useCallback(() => setPageReady(true), []);
  const onCurtainRemoved = useCallback(() => {
    try {
      localStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      // ignore
    }
    setShowCurtain(false);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-loading', !pageReady);
    document.body.classList.toggle('is-ready', pageReady);
  }, [pageReady]);

  useSmoothAnchors();

  return (
    <>
      <Analytics />
      <JsonLd />
      {showCurtain && (
        <Curtain onReady={onIntroReady} onRemoved={onCurtainRemoved} />
      )}
      <ScrollRevealProvider enabled={pageReady}>
        <main className="min-h-screen bg-background">
          <SiteHeader />
          <Hero />
          <WeeklyMenu />
          <About />
          <Steps />
          <Pricing />
          <Gallery />
          <Contact />
          <SiteFooter />
          <BackToTop />
          <Toaster position="top-center" theme={theme} richColors />
        </main>
      </ScrollRevealProvider>
    </>
  );
}
