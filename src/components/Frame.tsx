import type { ReactNode } from 'react';
import { brand } from '../content';
import { Item, Stagger } from './motion';

/** Marco de slide interna: franja superior, etiqueta, título, cuerpo y pie. */
export function Frame({ label, title, children, extra }: { label: string; title: string; children: ReactNode; extra?: ReactNode }) {
  return (
    <div className="slide light">
      <div className="stripe" />
      {extra}
      <Stagger className="inner">
        <Item className="label">{label}</Item>
        <Item as="div" className="title"><h2 style={{ font: 'inherit' }}>{title}</h2></Item>
        <div className="body">{children}</div>
      </Stagger>
      <div className="footer">
        <span>{brand.footerLeft}</span>
        <span>{brand.footerRight}</span>
      </div>
    </div>
  );
}

/** Arco de marca cian → turquesa. */
export function Arc({ id, style, opacity = 1 }: { id: string; style: React.CSSProperties; opacity?: number }) {
  return (
    <svg className="arc" style={{ ...style, opacity }} width="760" height="760" viewBox="0 0 760 760" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00A9CE" />
          <stop offset="1" stopColor="#1DD2DD" />
        </linearGradient>
      </defs>
      <circle cx="380" cy="380" r="330" fill="none" stroke={`url(#${id})`} strokeWidth="64" opacity="0.9" />
      <circle cx="380" cy="380" r="230" fill="none" stroke={`url(#${id})`} strokeWidth="2" opacity="0.5" />
    </svg>
  );
}
