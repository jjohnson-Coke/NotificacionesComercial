import { FECHA_VALIDACION, slides } from '../content';
import { Arc, Frame } from '../components/Frame';
import { CountUp, Item } from '../components/motion';

function Chevron({ on }: { on: boolean }) {
  return (
    <svg width="16" height="28" viewBox="0 0 16 28" aria-hidden>
      <path d="M3 3 L13 14 L3 25" fill="none" stroke={on ? '#00A9CE' : '#A9B1BE'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AskText({ text }: { text: string }) {
  const [a, b] = text.split('{fecha}');
  if (b === undefined) return <>{text}</>;
  return (
    <>
      {a}
      {FECHA_VALIDACION ? <span className="date">{FECHA_VALIDACION}</span> : <span className="pending">[fecha]</span>}
      {b}
    </>
  );
}

export default function Journey() {
  const s = slides.journey;
  return (
    <Frame label={s.label} title={s.title} extra={<Arc id="arc-close" style={{ right: -400, top: -500 }} opacity={0.14} />}>
      <div className="journey">
        {s.stages.flatMap((st, i) => [
          i > 0 && (
            <Item key={`l${i}`} className="jlink"><Chevron on={st.highlight || s.stages[i - 1].highlight} /></Item>
          ),
          <Item key={st.name} className={`jstage ${st.highlight ? 'hi' : 'dim'}`}>
            <div className="j-name">{st.name}</div>
            <div className="j-team">{st.teams}</div>
            {st.moments !== undefined && (
              <div className="j-moments"><b><CountUp to={st.moments} delay={0.6} duration={0.7} /></b><span>momentos</span></div>
            )}
          </Item>,
        ])}
      </div>

      <Item className="asks-head">{s.asksHeading}</Item>
      <div className="grid4">
        {s.asks.map((a, i) => (
          <Item key={a.title} className="card ask">
            <div className="ask-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="ask-title">{a.title}</div>
            <div className="ask-text"><AskText text={a.text} /></div>
          </Item>
        ))}
      </div>
    </Frame>
  );
}
