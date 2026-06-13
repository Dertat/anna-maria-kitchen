import { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
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
import { useTheme } from './theme/ThemeProvider';

export default function App() {
  const { theme } = useTheme();
  const [pageReady, setPageReady] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);

  const onIntroReady = useCallback(() => setPageReady(true), []);
  const onCurtainRemoved = useCallback(() => setShowCurtain(false), []);

  useEffect(() => {
    document.body.classList.toggle('is-loading', !pageReady);
    document.body.classList.toggle('is-ready', pageReady);
  }, [pageReady]);

  useSmoothAnchors();

  return (
    <>
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
