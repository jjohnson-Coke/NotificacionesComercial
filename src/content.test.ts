import { describe, expect, it } from 'vitest';
import { slides } from './content';

const { asIs, toBe, timeline, journey } = slides;
const commercialCols = timeline.columns.filter((c) => !c.context);
const commercialMoments = commercialCols.flatMap((c) => c.moments);

describe('Consistencia lógica de content.ts', () => {
  it('Línea del tiempo: 4 + 2 = 6 momentos de Comercial (sin contar contexto)', () => {
    expect(commercialCols.map((c) => c.moments.length)).toEqual([4, 2]);
    expect(commercialMoments).toHaveLength(6);
    expect(commercialMoments.every((m) => m.kind !== 'C')).toBe(true);
  });

  it('Columnas de contexto solo contienen momentos [C]', () => {
    timeline.columns
      .filter((c) => c.context)
      .forEach((c) => expect(c.moments.every((m) => m.kind === 'C')).toBe(true));
  });

  it('Principales = 3, excepciones = 3 (3 + 3 = 6)', () => {
    const p = commercialMoments.filter((m) => m.kind === 'P').length;
    const e = commercialMoments.filter((m) => m.kind === 'E').length;
    expect(p).toBe(3);
    expect(e).toBe(3);
    expect(toBe.split.principal.count).toBe(p);
    expect(toBe.split.exception.count).toBe(e);
    expect(p + e).toBe(toBe.morph.to);
  });

  it('Decisiones: 1 + 2 + 1 + 2 = 6', () => {
    expect(toBe.decisions.map((d) => d.count)).toEqual([1, 2, 1, 2]);
    const sum = toBe.decisions.reduce((a, d) => a + d.count, 0);
    expect(sum).toBe(6);
    expect(sum).toBe(toBe.morph.to);
    expect(toBe.totalLabel).toContain(String(sum));
    expect(toBe.title).toContain(`${toBe.morph.to} momentos`);
  });

  it('«Comercial · N» coincide con los momentos reales y con el journey (Exploración 4, Definición 2)', () => {
    commercialCols.forEach((c) => {
      expect(c.declaredCount).toBe(c.moments.length);
      const stage = journey.stages.find((s) => s.name === c.stage);
      expect(stage, `etapa ${c.stage} en el journey`).toBeDefined();
      expect(stage!.highlight).toBe(true);
      expect(stage!.moments).toBe(c.moments.length);
    });
    expect(journey.stages.find((s) => s.name === 'Exploración')!.moments).toBe(4);
    expect(journey.stages.find((s) => s.name === 'Definición')!.moments).toBe(2);
    expect(journey.stages.filter((s) => s.highlight).every((s) => s.teams === 'Comercial')).toBe(true);
    expect(journey.stages).toHaveLength(7);
  });

  it('As Is de Comercial: 7 correos; 3 manuales y 1 con ajuste (ambos ≤ 7)', () => {
    const c = asIs.commercial;
    expect(c.total).toBe(7);
    expect(c.manual).toBe(3);
    expect(c.needsAdjustment).toBe(1);
    expect(c.manual).toBeLessThanOrEqual(c.total);
    expect(c.needsAdjustment).toBeLessThanOrEqual(c.total);
    expect(c.cards.map((x) => x.value)).toEqual([c.total, c.manual, c.needsAdjustment]);
    expect(toBe.morph.from).toBe(c.total);
  });

  it('86/131 ≈ 66 % y 111/131 ≈ 85 %', () => {
    const a = asIs.allTeams;
    expect(Math.round((a.needsAdjustment / a.total) * 100)).toBe(66);
    expect(Math.round((a.manual / a.total) * 100)).toBe(85);
    expect(a.cards[0].value).toBe(a.total);
    expect(a.cards[1].value).toBe(Math.round((a.needsAdjustment / a.total) * 100));
    expect(a.cards[2].value).toBe(Math.round((a.manual / a.total) * 100));
    expect(a.cards[1].text).toContain(String(a.needsAdjustment));
    expect(a.cards[2].text).toContain(String(a.manual));
  });
});
