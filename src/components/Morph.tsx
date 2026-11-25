import { useEffect, useMemo } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { interpolate } from 'flubber';
import { digitPaths } from './digitPaths';
import { useReduced } from './motion';

const NAVY = '#1A2340';
const GREY = '#A9B1BE';
const CYAN = '#00A9CE';

// El «6» tiene dos subtrazos: el de mayor longitud es el contorno exterior; el otro, el hueco.
const [outer6, hole6] = [...digitPaths['6']].sort((a, b) => b.length - a.length);
const path7 = digitPaths['7'][0];

/** Protagonista de la slide 3: el 7 se transforma en 6. */
export function Morph({ fromLabel, toLabel }: { fromLabel: string; toLabel: string }) {
  const reduced = useReduced();
  const p = useMotionValue(reduced ? 1 : 0);
  const interp = useMemo(() => interpolate(path7, outer6, { maxSegmentLength: 3 }), []);
  const d = useTransform(p, (v) => interp(v));
  const fill = useTransform(p, [0, 1], [GREY, CYAN]);
  const holeScale = useTransform(p, [0.55, 1], [0, 1]);
  const fromOp = useTransform(p, [0, 1], [1, 0.55]);
  const toOp = useTransform(p, [0, 1], [0.45, 1]);

  useEffect(() => {
    if (reduced) return;
    const c = animate(p, 1, { delay: 0.8, duration: 1.0, ease: [0.65, 0, 0.35, 1] });
    return () => c.stop();
  }, [p, reduced]);

  return (
    <>
      <svg width="330" height="440" viewBox="0 0 300 400" role="img" aria-label="7 correos hoy se convierten en 6 momentos">
        {reduced ? (
          <>
            <motion.path d={path7} fill={GREY} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 0.6, duration: 0.6 }} />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
              <path d={outer6} fill={CYAN} />
              <path d={hole6} fill={NAVY} />
            </motion.g>
          </>
        ) : (
          <>
            <motion.path d={d} style={{ fill }} />
            <motion.path d={hole6} fill={NAVY} style={{ scale: holeScale, transformBox: 'fill-box', transformOrigin: 'center' }} />
          </>
        )}
      </svg>
      <div className="morph-legend">
        <motion.span style={{ opacity: fromOp }}>{fromLabel}</motion.span>
        <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden>
          <path d="M2 10 H30 M22 3 L30 10 L22 17" fill="none" stroke="#1DD2DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <motion.span style={{ opacity: toOp, color: '#1DD2DD' }}>{toLabel}</motion.span>
      </div>
    </>
  );
}
