import { motion } from 'framer-motion';
import { slides } from '../content';
import { Frame } from '../components/Frame';
import { EASE, Item, useReduced } from '../components/motion';

function Arrow() {
  const reduced = useReduced();
  return (
    <div style={{ position: 'relative', height: 26 }} aria-hidden>
      <motion.div
        style={{
          position: 'absolute', left: 0, right: 6, top: 11.5, height: 3, borderRadius: 2,
          background: 'linear-gradient(90deg, #A9B1BE 0%, #00A9CE 20%, #7880CC 78%, #A9B1BE 86%)',
        }}
        initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
        animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
        transition={{ delay: 0.3, duration: reduced ? 0.3 : 0.9, ease: EASE }}
      />
      <motion.svg width="18" height="26" viewBox="0 0 18 26" style={{ position: 'absolute', right: 0, top: 0 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0.3 : 1.1, duration: 0.3 }}>
        <path d="M3 4 L15 13 L3 22" stroke="#A9B1BE" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </div>
  );
}

export default function Timeline() {
  const s = slides.timeline;
  const reduced = useReduced();
  let order = 0;
  return (
    <Frame label={s.label} title={s.title}>
      <div className="tl">
        {s.columns.map((c) => (
          <Item key={c.stage} className={`tl-col tl-head ${c.context ? 'ctx' : ''}`}>
            <div className="tl-stage">{c.stage}</div>
            <div className="tl-sub">
              {c.context ? `${c.team} · ${c.subtitle}` : <>{c.team} · <b>{c.declaredCount}</b></>}
            </div>
          </Item>
        ))}
        <div className="tl-arrow"><Arrow /></div>
        {s.columns.map((c) => (
          <div key={c.stage} className={`tl-moments ${c.context ? 'ctx' : ''}`}>
            {c.moments.map((m) => {
              const delay = 0.55 + order++ * 0.12;
              return (
                <div key={m.name} className={`moment ${m.kind}`}>
                  <motion.div
                    className={`mline ${m.kind}`}
                    initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                    animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
                    transition={{ delay, duration: reduced ? 0.3 : 0.55, ease: EASE }}
                  />
                  <motion.div
                    initial={{ opacity: 0, x: reduced ? 0 : -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay + 0.12, duration: 0.45, ease: EASE }}
                  >
                    <div className="m-name">{m.name}</div>
                    <div className="m-trigger">{m.trigger}</div>
                    {m.channel && <span className="chip">{m.channel}</span>}
                  </motion.div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <Item className="legend">
        <span><i className="lg" style={{ background: '#00A9CE' }} />{s.legend.principal}</span>
        <span><i className="lg mline E" style={{ position: 'static' }} />{s.legend.exception}</span>
        <span><i className="lg" style={{ background: '#A9B1BE' }} />{s.legend.context}</span>
      </Item>
    </Frame>
  );
}
