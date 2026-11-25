import { slides } from '../content';
import { Arc } from '../components/Frame';
import { Item, Stagger } from '../components/motion';

export default function Cover() {
  const c = slides.cover;
  return (
    <div className="slide dark">
      <Arc id="arc-cover" style={{ right: -260, bottom: -300 }} />
      <Stagger className="cover">
        <Item className="cover-label">{c.label}</Item>
        <Item><h1 className="cover-title">{c.title}</h1></Item>
        <Item><p className="cover-sub">{c.subtitle}</p></Item>
        <Item><div className="cover-rule" /></Item>
      </Stagger>
      <div className="cover-foot">{c.footer}</div>
    </div>
  );
}
