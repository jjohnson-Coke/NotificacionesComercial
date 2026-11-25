import { slides } from '../content';
import { Frame } from '../components/Frame';
import { CountUp, Item } from '../components/motion';

function BridgeIcon() {
  return (
    <svg width="120" height="56" viewBox="0 0 120 56" aria-hidden>
      <defs>
        <linearGradient id="bridge-g" x1="0" x2="1">
          <stop offset="0" stopColor="#00A9CE" />
          <stop offset="1" stopColor="#7880CC" />
        </linearGradient>
      </defs>
      <path d="M6 44 Q60 -6 114 44" fill="none" stroke="url(#bridge-g)" strokeWidth="5" strokeLinecap="round" />
      <path d="M6 44 H114" stroke="#DCE6F2" strokeWidth="3" strokeLinecap="round" />
      {[30, 60, 90].map((x) => (
        <line key={x} x1={x} x2={x} y1={x === 60 ? 20 : 27} y2="44" stroke="#A9B1BE" strokeWidth="2.5" />
      ))}
      <path d="M104 37 L114 44 L104 51" fill="none" stroke="#7880CC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AsIs() {
  const s = slides.asIs;
  return (
    <Frame label={s.label} title={s.title}>
      <Item className="row-head">{s.allTeams.heading}</Item>
      <div className="grid3">
        {s.allTeams.cards.map((c, i) => (
          <Item key={i} className="card stat">
            <div className="stat-num"><CountUp to={c.value} suffix={c.suffix} delay={0.35 + i * 0.07} /></div>
            <div className="stat-text">{c.text}</div>
          </Item>
        ))}
      </div>

      <Item className="panel-com">
        <div>
          <div className="row-head">{s.commercial.heading}</div>
        </div>
        {s.commercial.cards.map((c, i) => (
          <div key={i} className="com-stat">
            <div className="com-num"><CountUp to={c.value} delay={0.6 + i * 0.07} duration={0.8} /></div>
            <div className="com-text">{c.text}</div>
          </div>
        ))}
      </Item>

      <Item className="card callout">
        <div className="bridge">
          <span className="pill a">{s.callout.from}</span>
          <BridgeIcon />
          <span className="pill b">{s.callout.to}</span>
        </div>
        <p className="callout-text">{s.callout.text}</p>
      </Item>
    </Frame>
  );
}
