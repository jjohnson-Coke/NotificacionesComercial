import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slideOrder, slides } from './content';
import { EASE, useReduced } from './components/motion';
import Cover from './slides/Cover';
import AsIs from './slides/AsIs';
import ToBe from './slides/ToBe';
import Timeline from './slides/Timeline';
import Journey from './slides/Journey';

const COMPONENTS: Record<(typeof slideOrder)[number], ComponentType> = {
  cover: Cover, asIs: AsIs, toBe: ToBe, timeline: Timeline, journey: Journey,
};
const DARK = new Set(['cover']);
const N = slideOrder.length;
const W = 1920, H = 1080;

const readHash = () => {
  const n = parseInt(window.location.hash.replace('#', ''), 10);
  return Number.isFinite(n) ? Math.min(N, Math.max(1, n)) - 1 : 0;
};

function useScale() {
  const [s, setS] = useState(1);
  useEffect(() => {
    const f = () => setS(Math.min(window.innerWidth / W, window.innerHeight / H));
    f();
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  return s;
}

function useFullscreen() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', f);
    return () => document.removeEventListener('fullscreenchange', f);
  }, []);
  const toggle = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);
  return { on, toggle };
}

function FsIcon({ on }: { on: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {on ? (
        <path d="M9 3v4a2 2 0 0 1-2 2H3M21 9h-4a2 2 0 0 1-2-2V3M3 15h4a2 2 0 0 1 2 2v4M15 21v-4a2 2 0 0 1 2-2h4" />
      ) : (
        <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
      )}
    </svg>
  );
}

export default function App() {
  const [[index, dir], setState] = useState<[number, number]>(() => [readHash(), 0]);
  const [notes, setNotes] = useState(false);
  const [idle, setIdle] = useState(false);
  const scale = useScale();
  const fs = useFullscreen();
  const reduced = useReduced();
  const idleTimer = useRef<number>();

  const go = useCallback((to: number) => {
    setState(([cur]) => {
      const next = Math.min(N - 1, Math.max(0, to));
      return next === cur ? [cur, 0] : [next, next > cur ? 1 : -1];
    });
  }, []);
  const next = useCallback(() => setState(([c]) => (c < N - 1 ? [c + 1, 1] : [c, 0])), []);
  const prev = useCallback(() => setState(([c]) => (c > 0 ? [c - 1, -1] : [c, 0])), []);

  // URL ↔ slide
  useEffect(() => { history.replaceState(null, '', `#${index + 1}`); }, [index]);
  useEffect(() => {
    const f = () => go(readHash());
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, [go]);

  // Teclado (incluye presentadores inalámbricos: Re Pág / Av Pág)
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': case 'ArrowDown': e.preventDefault(); next(); break;
        case ' ': e.preventDefault(); (e.shiftKey ? prev : next)(); break;
        case 'ArrowLeft': case 'PageUp': case 'ArrowUp': e.preventDefault(); prev(); break;
        case 'Home': e.preventDefault(); go(0); break;
        case 'End': e.preventDefault(); go(N - 1); break;
        case 'f': case 'F': e.preventDefault(); fs.toggle(); break;
        case 'n': case 'N': e.preventDefault(); setNotes((v) => !v); break;
      }
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, [next, prev, go, fs]);

  // Swipe en touch
  useEffect(() => {
    let x0 = 0, y0 = 0;
    const s = (e: TouchEvent) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; };
    const t = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) (dx < 0 ? next : prev)();
    };
    window.addEventListener('touchstart', s, { passive: true });
    window.addEventListener('touchend', t, { passive: true });
    return () => { window.removeEventListener('touchstart', s); window.removeEventListener('touchend', t); };
  }, [next, prev]);

  // Controles que se desvanecen tras 2.5 s sin mover el mouse
  useEffect(() => {
    const wake = () => {
      setIdle(false);
      clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setIdle(true), 2500);
    };
    wake();
    window.addEventListener('mousemove', wake);
    window.addEventListener('touchstart', wake, { passive: true });
    return () => { window.removeEventListener('mousemove', wake); window.removeEventListener('touchstart', wake); clearTimeout(idleTimer.current); };
  }, []);

  const key = slideOrder[index];
  const Slide = COMPONENTS[key];
  const dark = DARK.has(key);
  const dx = reduced ? 0 : 72;

  return (
    <div className={`app ${idle ? 'idle' : ''}`}>
      <div className="stage" style={{ ['--scale' as string]: scale }}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.section
            key={key}
            className="slide"
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d * dx, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: -d * dx, opacity: 0 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.45, ease: EASE }}
            aria-roledescription="diapositiva"
            aria-label={`${index + 1} de ${N}: ${slides[key].nav}`}
          >
            <Slide />
          </motion.section>
        </AnimatePresence>
      </div>

      <button
        className="fs-btn controls"
        onClick={fs.toggle}
        aria-label={fs.on ? 'Salir de pantalla completa' : 'Pantalla completa'}
      >
        <FsIcon on={fs.on} />
        <span className="tooltip">{fs.on ? 'Salir de pantalla completa' : 'Pantalla completa'} (F)</span>
      </button>

      <div className="progress-zone">
        <div className="dots controls">
          {slideOrder.map((k, i) => (
            <button key={k} className={`dot ${i === index ? 'active' : ''}`} style={{ left: `${((i + 0.5) / N) * 100}%` }}
              onClick={() => go(i)} aria-label={`Ir a ${i + 1}: ${slides[k].nav}`}>
              <span className="dot-name">{i + 1} · {slides[k].nav}</span>
              <i />
            </button>
          ))}
        </div>
        <div className={`counter controls ${dark ? 'on-dark' : 'on-light'}`} aria-live="polite">{index + 1} / {N}</div>
        <div className="progress-track">
          <motion.div className="progress-fill" initial={false} animate={{ width: `${((index + 1) / N) * 100}%` }}
            transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 170, damping: 26 }} />
        </div>
      </div>

      <AnimatePresence>
        {notes && (
          <motion.aside className="notes" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.25 }}>
            <div className="notes-head"><span>Notas · {index + 1} / {N} · {slides[key].nav}</span><span>N para ocultar</span></div>
            <p>{slides[key].notes}</p>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
