import { motion } from 'framer-motion';
import { slides } from '../content';
import { Frame } from '../components/Frame';
import { Morph } from '../components/Morph';
import { CountUp, EASE, Item, useReduced } from '../components/motion';

export default function ToBe() {
  const s = slides.toBe;
  const reduced = useReduced();
  return (
    <Frame label={s.label} title={s.title}>
      <div className="tobe">
        <Item className="morph-panel">
          <Morph fromLabel={s.morph.fromLabel} toLabel={s.morph.toLabel} />
        </Item>
        <div className="decisions">
          {s.decisions.map((d, i) => (
            <Item key={d.label} className="card decision">
              <div className="decision-num"><CountUp to={d.count} delay={0.45 + i * 0.07} duration={0.6} /></div>
              <div className="decision-label">{d.label}</div>
              <div className="decision-text">{d.text}</div>
            </Item>
          ))}
          <Item className="total">{s.totalLabel}</Item>
        </div>
      </div>

      <Item className="split-head">{s.split.heading}</Item>
      <div className="split">
        {([['p', s.split.principal], ['e', s.split.exception]] as const).map(([k, seg], i) => (
          <motion.div
            key={k}
            className={`seg ${k}`}
            initial={{ opacity: 0, scaleX: reduced ? 1 : 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9 + i * 0.08, duration: 0.6, ease: EASE }}
          >
            <b>{seg.count} {seg.label}:</b> {seg.text}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}
