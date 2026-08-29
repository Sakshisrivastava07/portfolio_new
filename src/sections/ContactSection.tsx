import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import LiveProjectButton from '../components/LiveProjectButton';
import DecorativeCharm from '../components/DecorativeCharm';
import MessageForm from '../components/MessageForm';
import { CHARMS } from '../constants/charms';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative charms */}
      <DecorativeCharm
        src={CHARMS[2]}
        size="w-[70px] sm:w-[90px] md:w-[110px]"
        position="top-[4%] right-[2%] sm:right-[3%] md:right-[5%]"
        delay={0.1}
      />
      <DecorativeCharm
        src={CHARMS[0]}
        size="w-[70px] sm:w-[90px] md:w-[110px]"
        position="bottom-[5%] left-[2%] sm:left-[3%] md:left-[5%]"
        delay={0.2}
        flip
      />

      {/* Heading + text + buttons */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-10">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Let&apos;s Connect
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16">
          <FadeIn delay={0.1}>
            <p
              className="text-[#D7E2EA] font-medium text-center"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)' }}
            >
              sakshisrivastava09090@gmail.com · +91 7043166110
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ContactButton label="Email Me" href="mailto:sakshisrivastava09090@gmail.com" />
          </FadeIn>

          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
            <FadeIn delay={0.3}>
              <LiveProjectButton
                label="LinkedIn ↗"
                href="https://www.linkedin.com/in/sakshi-srivastava-7198432ab/"
              />
            </FadeIn>
            <FadeIn delay={0.35}>
              <LiveProjectButton
                label="GitHub ↗"
                href="https://github.com/Sakshisrivastava07"
              />
            </FadeIn>
            <FadeIn delay={0.4}>
              <LiveProjectButton
                label="LeetCode ↗"
                href="https://leetcode.com/u/sakshisrivastava07/"
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.45} y={30} className="w-full flex justify-center px-2">
            <MessageForm />
          </FadeIn>

          <FadeIn delay={0.55}>
            <p
              className="text-[#D7E2EA]/60 font-medium text-center"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
            >
              Sakshi Srivastava
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
