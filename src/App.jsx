import { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Analytics } from './components/Analytics';
import { CookieConsent } from './components/CookieConsent';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { BackToTop } from './components/BackToTop';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Curtain } from './components/Curtain';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { Steps } from './components/Steps';
import { WeeklyMenu } from './components/WeeklyMenu';
import { useSmoothAnchors } from './hooks/useSmoothAnchors';
import { ScrollRevealProvider } from './hooks/useScrollReveal';
import { INTRO_SEEN_KEY } from './lib/storageKeys';
import { useTheme } from './theme/ThemeProvider';

function introAlreadySeen() {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export default function App() {
  const { theme } = useTheme();
  const [pageReady, setPageReady] = useState(() => introAlreadySeen());
  const [showCurtain, setShowCurtain] = useState(() => !introAlreadySeen());

  const onIntroReady = useCallback(() => setPageReady(true), []);
  const onCurtainRemoved = useCallback(() => {
    setShowCurtain(false);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-loading', !pageReady);
    document.body.classList.toggle('is-ready', pageReady);
    document.body.classList.toggle('curtain-active', showCurtain);
  }, [pageReady, showCurtain]);

  useSmoothAnchors();

  return (
    <>
      <Analytics />
      <CookieConsent />
      <PrivacyPolicy />
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
          <Testimonials />
          <Contact />
          <SiteFooter />
          <BackToTop />
          <Toaster position="top-center" theme={theme} richColors />
        </main>
      </ScrollRevealProvider>
    </>
  );
}
