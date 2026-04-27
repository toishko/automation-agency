import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, Zap, BarChart2, Globe, ChevronDown } from 'lucide-react';

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useIntersection();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#333]">
        <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#4a90e2] flex items-center justify-center">
              <Zap size={15} className="text-white fill-white" />
            </div>
            <span className="font-semibold tracking-tight text-white text-sm">FlowAI</span>
          </div>
          <a
            href="#audit"
            className="text-sm font-semibold bg-[#4a90e2] hover:bg-[#3a7fd1] text-white px-5 py-2 rounded-full transition-all duration-200"
          >
            Request Audit
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#4a90e2]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#4a90e2]/4 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div
            style={{ opacity: 1, animation: 'fadeSlideUp 0.8s ease forwards' }}
            className="inline-flex items-center gap-2 bg-[#2a2a2a] border border-[#333] rounded-full px-4 py-1.5 text-xs text-[#b0b0b0] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a90e2] animate-pulse" />
            Practical AI Automation — No Hype
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-7"
            style={{ animation: 'fadeSlideUp 0.8s ease 0.1s both' }}
          >
            Your operations run on{' '}
            <span className="text-[#b0b0b0]">manual work,</span>{' '}
            disconnected tools,{' '}
            <span className="text-[#b0b0b0]">and wasted time.</span>
          </h1>

          <p
            className="text-xl md:text-2xl text-[#b0b0b0] leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ animation: 'fadeSlideUp 0.8s ease 0.2s both' }}
          >
            AI isn't magic—it's a system. We build practical automations that eliminate friction and connect your workflows.
          </p>

          <div style={{ animation: 'fadeSlideUp 0.8s ease 0.3s both' }}>
            <a
              href="#audit"
              className="inline-flex items-center gap-2 bg-[#4a90e2] hover:bg-[#3a7fd1] text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(74,144,226,0.35)] active:scale-[0.98]"
            >
              Request an Automation Audit
              <ArrowRight size={20} />
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ChevronDown size={22} className="text-[#b0b0b0]" />
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-28 px-6 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight">Is this for you?</h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {/* For */}
            <FadeUp delay={0.05}>
              <div className="bg-[#2a2a2a] border border-[#333] rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#4a90e2]/15 flex items-center justify-center">
                    <CheckCircle size={17} className="text-[#4a90e2]" />
                  </div>
                  <h3 className="text-lg font-semibold">This is for you if...</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'You run a business with real operations',
                    'Your team spends hours on repetitive manual work',
                    'You want clarity before making any investment',
                    "You're curious about AI but skeptical of the hype",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#b0b0b0] leading-relaxed">
                      <CheckCircle size={17} className="text-[#4a90e2] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Not for */}
            <FadeUp delay={0.15}>
              <div className="bg-[#222] border border-[#333] rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                    <XCircle size={17} className="text-red-400/80" />
                  </div>
                  <h3 className="text-lg font-semibold">This isn't for you if...</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "You're looking for magic buttons or instant fixes",
                    'This is a hobby project or experiment',
                    'You expect results without changing how you work',
                    "You want to implement AI just because it's trendy",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#b0b0b0] leading-relaxed">
                      <XCircle size={17} className="text-red-400/60 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 px-6 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4a90e2] mb-3 block">Process</span>
            <h2 className="text-4xl font-semibold tracking-tight">How it works</h2>
          </FadeUp>

          <div className="space-y-0">
            {[
              {
                number: '01',
                title: 'Understand Your Current System',
                body: 'We map how work actually flows through your business today — the tools, the handoffs, the bottlenecks.',
              },
              {
                number: '02',
                title: 'Identify Bottlenecks and Waste',
                body: 'We pinpoint exactly where time and effort disappear into manual processes so nothing is assumed.',
              },
              {
                number: '03',
                title: 'Design Practical Automations',
                body: 'We create solutions that fit your existing operations, not the other way around.',
              },
              {
                number: '04',
                title: 'Decide Together What Makes Sense',
                body: 'You get clear, prioritized recommendations. You choose what to implement and when — always.',
              },
            ].map((step, i) => (
              <FadeUp key={step.number} delay={i * 0.1}>
                <div className="flex gap-8 py-10 border-b border-[#333] last:border-b-0 group">
                  <div className="text-4xl font-bold text-[#333] group-hover:text-[#4a90e2]/30 transition-colors duration-300 w-14 shrink-0 pt-1 tabular-nums">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-[#b0b0b0] leading-relaxed text-lg">{step.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="py-24 px-6 bg-[#1a1a1a] border-y border-[#333]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap size={22} className="text-[#4a90e2]" />, stat: '8+ years', label: 'Building systems and working with data' },
              { icon: <BarChart2 size={22} className="text-[#4a90e2]" />, stat: '200+ automations', label: 'Running in production environments' },
              { icon: <Globe size={22} className="text-[#4a90e2]" />, stat: '15+ industries', label: 'From manufacturing to professional services' },
            ].map((item, i) => (
              <FadeUp key={item.stat} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-4 p-8 bg-[#2a2a2a] rounded-2xl border border-[#333] hover:border-[#4a90e2]/30 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#4a90e2]/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold tracking-tight">{item.stat}</div>
                  <div className="text-[#b0b0b0] text-sm leading-relaxed">{item.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-28 px-6 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4a90e2] mb-3 block">After you submit</span>
            <h2 className="text-4xl font-semibold tracking-tight mb-4">What happens next</h2>
            <p className="text-[#b0b0b0] text-lg mb-14">A clear, no-pressure process from first contact to decision.</p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5 text-left">
            {[
              { step: 1, title: 'Short intro call', body: 'We spend 30 minutes learning about your operations — not selling you anything.' },
              { step: 2, title: 'No sales pitch', body: 'We focus on understanding your workflows, constraints, and goals first.' },
              { step: 3, title: 'Clear recommendations', body: 'You receive a practical roadmap with specific automation opportunities.' },
              { step: 4, title: 'You decide', body: 'Choose what makes sense for your business, on your timeline. No pressure.' },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.1}>
                <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-6 hover:border-[#4a90e2]/30 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-[#4a90e2] text-white text-sm font-bold flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                  <p className="text-[#b0b0b0] text-sm leading-relaxed">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Audit CTA Form */}
      <section id="audit" className="py-28 px-6 bg-[#1a1a1a]">
        <div className="max-w-2xl mx-auto">
          <FadeUp className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4a90e2] mb-3 block">Free — No Strings Attached</span>
            <h2 className="text-4xl font-semibold tracking-tight mb-4">Free Automation Audit</h2>
            <p className="text-[#b0b0b0] text-lg leading-relaxed">
              We'll review your current workflows and identify specific automation opportunities. You'll get actionable recommendations whether we work together or not.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-[#2a2a2a] border border-[#333] rounded-2xl p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#4a90e2]/15 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={26} className="text-[#4a90e2]" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">You're all set.</h3>
                  <p className="text-[#b0b0b0] text-lg">We'll be in touch within one business day to schedule your intro call.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-[#b0b0b0] mb-1.5 block">Your name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full bg-[#1a1a1a] border border-[#333] hover:border-[#4a4a4a] focus:border-[#4a90e2] outline-none rounded-xl px-4 py-3 text-white placeholder-[#555] transition-colors duration-200 text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#b0b0b0] mb-1.5 block">Work email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full bg-[#1a1a1a] border border-[#333] hover:border-[#4a4a4a] focus:border-[#4a90e2] outline-none rounded-xl px-4 py-3 text-white placeholder-[#555] transition-colors duration-200 text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#b0b0b0] mb-1.5 block">Company / business</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full bg-[#1a1a1a] border border-[#333] hover:border-[#4a4a4a] focus:border-[#4a90e2] outline-none rounded-xl px-4 py-3 text-white placeholder-[#555] transition-colors duration-200 text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#4a90e2] hover:bg-[#3a7fd1] text-white font-semibold text-lg py-4 rounded-xl transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(74,144,226,0.3)] active:scale-[0.99] mt-2"
                  >
                    Request Your Free Automation Audit
                  </button>
                  <p className="text-[#555] text-sm text-center">No spam. No sales call unless you want one.</p>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 bg-[#2a2a2a] text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 max-w-2xl mx-auto leading-[1.15]">
            Ready to see what's possible with your operations?
          </h2>
          <p className="text-[#b0b0b0] text-lg mb-10 max-w-xl mx-auto">
            The audit is free. The recommendations are yours to keep. The decision is always yours.
          </p>
          <a
            href="#audit"
            className="inline-flex items-center gap-2 bg-[#4a90e2] hover:bg-[#3a7fd1] text-white font-semibold text-xl px-10 py-5 rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(74,144,226,0.4)] active:scale-[0.98]"
          >
            Request Your Free Automation Audit
            <ArrowRight size={22} />
          </a>
        </FadeUp>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#333] bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#4a90e2] flex items-center justify-center">
              <Zap size={13} className="text-white fill-white" />
            </div>
            <span className="font-semibold text-sm text-white">FlowAI</span>
          </div>
          <p className="text-[#555] text-sm">© 2026 FlowAI. Practical automation for real operations.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
