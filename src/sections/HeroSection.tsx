import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import AvatarEyeFollow from '../components/AvatarEyeFollow';

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Achievements', 'Education', 'Contact'];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      id="hero"
      className="h-screen flex flex-col relative"
      style={{ overflowX: 'clip' }}
    >
      {/* Sticky Navbar */}
      <FadeIn delay={0} y={-20} as="nav">
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0C0C0C] border-b border-[#D7E2EA]/10 backdrop-blur-sm">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 px-6 md:px-10 py-5 md:py-6">
            {/* Logo - SS with profile picture - clickable */}
            <a href="#hero" className="flex-shrink-0 hover:opacity-70 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B600A8] to-[#7621B0] p-0.5 flex items-center justify-center">
                <img
                  src="/no-background-1787858821023.png"
                  alt="SS"
                  className="w-full h-full rounded-full object-cover cursor-pointer"
                />
              </div>
            </a>

            {/* Nav Links - centered and evenly spaced (desktop only) */}
            <div className="hidden lg:flex justify-between items-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-base transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Hamburger toggle (mobile/tablet) / spacer to balance logo width (desktop) */}
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="lg:hidden text-[#D7E2EA] hover:opacity-70 transition-opacity"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile/tablet dropdown menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="lg:hidden overflow-hidden border-t border-[#D7E2EA]/10"
              >
                <div className="flex flex-col px-6 py-4 gap-1">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm py-2.5 transition-opacity duration-200 hover:opacity-70"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </FadeIn>

      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-24"></div>

      {/* Hero Heading */}
      <div className="overflow-hidden w-full px-6 md:px-10 text-center">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none w-full text-[7vw] sm:text-[8vw] md:text-[8.5vw] lg:text-[9vw]">
            Sakshi Srivastava
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
      >
        <FadeIn delay={0.6} y={30}>
          <AvatarEyeFollow />
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 sm:gap-0 pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[220px] sm:max-w-[220px] md:max-w-[280px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Aspiring software engineer building AI/ML, full-stack, and DSA-driven projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton
            label="Resume ↗"
            href="https://my-portfolio-theta-three-82.vercel.app/assets/resume/SakshiSrivastavaResume.2026_.pdf"
          />
        </FadeIn>
      </div>
    </section>
  );
}
