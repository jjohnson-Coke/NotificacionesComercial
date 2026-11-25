import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, type MotionStyle, type Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;
export const STAGGER = 0.07;

/** true si el usuario prefiere movimiento reducido (solo fades). */
export const ReducedCtx = createContext(false);
export const useReduced = () => useContext(ReducedCtx);

export function ReducedProvider({ children }: { children: ReactNode }) {
  const r = useReducedMotion();
  return <ReducedCtx.Provider value={!!r}>{children}</ReducedCtx.Provider>;
}

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER, delayChildren: 0.12 } },
};

/** Elemento escalonado: título → cifras → tarjetas (el orden lo da el DOM). */
export function Item({ children, className, style, as = 'div' }: {
  children?: ReactNode; className?: string; style?: React.CSSProperties; as?: 'div' | 'span';
}) {
  const reduced = useReduced();
  const v: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.3 : 0.55, ease: EASE } },
  };
  const C = as === 'span' ? motion.span : motion.div;
  return <C variants={v} className={className} style={style as MotionStyle}>{children}</C>;
}

export function Stagger({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style as MotionStyle} variants={container} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}

/** Contador animado (count-up). Con movimiento reducido muestra la cifra final. */
export function CountUp({ to, delay = 0.3, duration = 1.1, suffix = '' }: { to: number; delay?: number; duration?: number; suffix?: string }) {
  const reduced = useReduced();
  const [v, setV] = useState(reduced ? to : 0);
  useEffect(() => {
    if (reduced) { setV(to); return; }
    let raf = 0;
    let start = 0;
    const t0 = window.setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / (duration * 1000));
        const e = 1 - Math.pow(1 - p, 3);
        setV(Math.round(to * e));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay * 1000);
    return () => { clearTimeout(t0); cancelAnimationFrame(raf); };
  }, [to, delay, duration, reduced]);
  return <span className="tnum" aria-label={`${to}${suffix}`}>{v}{suffix}</span>;
}
