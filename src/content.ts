/**
 * Todo el contenido de la presentación vive aquí: textos, cifras y notas.
 * Edita este archivo sin tocar los componentes.
 *
 * Convenciones:
 *  - NBSP ( ) entre número y «%» o «h» para que no se separen al ajustar línea.
 *  - Comillas latinas «».
 */

const NBSP = ' ';
export const pct = (n: number) => `${n}${NBSP}%`;

/* ───────────── Constantes editables ───────────── */

/** Fecha límite de validación. Mientras sea `null`, se muestra «[fecha]» resaltado en violeta. */
export const FECHA_VALIDACION: string | null = null;

/* ───────────── Marca ───────────── */

export const brand = {
  footerLeft: 'TEC360 · Experiencia de Aprendedores',
  footerRight: 'VPAF · Aprendizaje para el Futuro',
};

/* ───────────── Tipos ───────────── */

export type MomentKind = 'P' | 'E' | 'C'; // Principal · Excepción · Contexto (otro equipo)

export interface Moment {
  kind: MomentKind;
  name: string;
  trigger: string;
  channel?: string;
}

export interface TimelineColumn {
  stage: string;
  team: string;
  /** Subtítulo para columnas de contexto («antes de ti», «lo que sigue»). */
  subtitle?: string;
  /** Número declarado en el encabezado («Comercial · N»). Solo en columnas de Comercial. */
  declaredCount?: number;
  context: boolean;
  moments: Moment[];
}

export interface JourneyStage {
  name: string;
  teams: string;
  /** Solo en las etapas de Comercial. */
  moments?: number;
  highlight: boolean;
}

/* ───────────── Slides ───────────── */

export const slides = {
  cover: {
    nav: 'Portada',
    label: 'SESIÓN DE ALINEACIÓN · COMERCIAL',
    title: 'Estrategia de notificaciones',
    subtitle:
      'De lo que hoy recibe el aprendedor a lo que va a vivir: qué cambia para Comercial.',
    footer: 'Journeys y Experiencia · VPAF · Noviembre 2026',
    notes:
      'Bienvenida. Objetivo de la sesión (30 min): ver juntos qué cambia para Comercial entre lo que hoy recibe el aprendedor (As Is) y lo que va a vivir (To Be). Venimos a validar, no a imponer.',
  },

  asIs: {
    nav: 'Lo que vimos',
    label: '1 · LO QUE VIMOS (AS IS)',
    title: `Revisamos el ${pct(100)}: 131 correos`,
    allTeams: {
      heading: 'Los 4 equipos',
      total: 131,
      needsAdjustment: 86,
      manual: 111,
      // Las tarjetas muestran: total, % que requiere ajuste y % manual.
      cards: [
        { value: 131, suffix: '', text: 'correos de Marketing, Comercial, Vivencia y Normatividad' },
        { value: 66, suffix: `${NBSP}%`, text: 'requieren algún ajuste (86 correos)' },
        { value: 85, suffix: `${NBSP}%`, text: 'se envían a mano (111 correos)' },
      ],
    },
    commercial: {
      heading: 'En Comercial',
      total: 7,
      manual: 3,
      needsAdjustment: 1,
      cards: [
        { value: 7, suffix: '', text: 'correos registrados' },
        { value: 3, suffix: '', text: 'se envían a mano' },
        { value: 1, suffix: '', text: 'requiere ajuste según la radiografía' },
      ],
    },
    callout: {
      from: 'interés',
      to: 'inscripción',
      text: 'Comercial es el puente entre el interés y la inscripción: lo que envías define la primera conversación con el Tec.',
    },
    notes:
      `≈5 min. Revisamos el ${pct(100)} de las comunicaciones de los 4 equipos: 131 correos. 2 de cada 3 requieren algún ajuste y el ${pct(85)} sale a mano. En Comercial son 7 correos, 3 manuales. Ejemplo del problema de fondo: hoy un aprendedor puede recibir tres «bienvenidas» de remitentes distintos antes de empezar. No es culpa de nadie: nadie veía el journey completo.`,
  },

  toBe: {
    nav: 'Antes → después',
    label: '2 · ANTES → DESPUÉS (TO BE)',
    title: 'De 7 correos a 6 momentos claros',
    morph: { from: 7, to: 6, fromLabel: 'correos hoy', toLabel: 'momentos en el To Be' },
    decisions: [
      {
        label: 'Cambiar canal',
        count: 1,
        text: `Presentación del asesor: de correo a WhatsApp o llamada en las primeras 24${NBSP}h.`,
      },
      {
        label: 'Rediseñar',
        count: 2,
        text: 'Carta de venta con la marca nueva (Salesforce) y confirmación de inscripción y pago.',
      },
      {
        label: 'Automatizar',
        count: 1,
        text: `«Te falta un paso para apartar tu lugar»: a las 48${NBSP}h si la solicitud está incompleta, por correo y WhatsApp.`,
      },
      {
        label: 'Mantener',
        count: 2,
        text: 'Reactivación de interés, y cancelación o reprogramación con opciones (hoy 2 correos, mañana 1).',
      },
    ],
    totalLabel: '= 6 momentos',
    split: {
      heading: 'Cómo se reparten los 6 momentos',
      principal: { count: 3, label: 'principales', text: 'todos los reciben' },
      exception: { count: 3, label: 'excepciones', text: 'solo si ocurre' },
    },
    notes:
      '≈12 min. Recorrer las 4 decisiones. Lo más visible: la presentación del asesor deja el correo y pasa a WhatsApp o llamada. La confirmación de pago es la puerta al Kit de bienvenida de Vivencia (7 días antes del inicio). Pregunta directa: ¿algo de esto no es viable? Nota: la radiografía marca solo 1 correo de Comercial que requiere ajuste, aunque el To Be rediseña 2; aclararlo si sale.',
  },

  timeline: {
    nav: 'Tu línea del tiempo',
    label: '3 · TU LÍNEA DEL TIEMPO',
    title: 'Dónde viven tus correos',
    columns: [
      {
        stage: 'Descubrimiento',
        team: 'Marketing',
        subtitle: 'antes de ti',
        context: true,
        moments: [
          { kind: 'C', name: 'Flujo único de Marketing', trigger: '6 correos al descargar el folleto o pedir asesor' },
        ],
      },
      {
        stage: 'Exploración',
        team: 'Comercial',
        declaredCount: 4,
        context: false,
        moments: [
          { kind: 'P', name: 'Presentación del asesor', trigger: `primeras 24${NBSP}h tras asignar asesor`, channel: 'WhatsApp o llamada' },
          { kind: 'P', name: 'Carta de venta (marca nueva)', trigger: 'al registrar interés en un programa' },
          { kind: 'E', name: 'Te falta un paso para apartar tu lugar', trigger: `48${NBSP}h con la solicitud incompleta` },
          { kind: 'E', name: 'Reactivación de interés', trigger: 'cuando el prospecto se enfría' },
        ],
      },
      {
        stage: 'Definición',
        team: 'Comercial',
        declaredCount: 2,
        context: false,
        moments: [
          { kind: 'P', name: 'Confirmación de inscripción y pago', trigger: 'al registrarse el pago' },
          { kind: 'E', name: 'Cancelación o reprogramación con opciones', trigger: 'si el programa se cancela o reprograma' },
        ],
      },
      {
        stage: 'Vivencia de propuesta de valor',
        team: 'Vivencia',
        subtitle: 'lo que sigue',
        context: true,
        moments: [{ kind: 'C', name: 'Kit de bienvenida', trigger: '7 días antes del inicio' }],
      },
    ] as TimelineColumn[],
    legend: {
      principal: 'Línea continua: principal, la reciben todos',
      exception: 'Línea punteada: excepción, solo si ocurre',
      context: 'Gris: otros equipos, como contexto',
    },
    notes:
      '≈3 min. Recorre de izquierda a derecha: qué recibe el prospecto de Comercial y en qué momento. En gris, lo que llega antes (Marketing) y lo que sigue (Kit de bienvenida de Vivencia).',
  },

  journey: {
    nav: 'Tu tramo del journey',
    label: '4 · TU TRAMO DEL JOURNEY',
    title: 'Un solo journey, cuatro equipos',
    stages: [
      { name: 'Descubrimiento', teams: 'Marketing', highlight: false },
      { name: 'Exploración', teams: 'Comercial', moments: 4, highlight: true },
      { name: 'Definición', teams: 'Comercial', moments: 2, highlight: true },
      { name: 'Vivencia de propuesta de valor', teams: 'Vivencia · Normatividad', highlight: false },
      { name: 'Certificación PIDA', teams: 'Normatividad', highlight: false },
      { name: 'Cierre y reconocimiento', teams: 'Normatividad', highlight: false },
      { name: 'Continuidad', teams: 'Vivencia', highlight: false },
    ] as JourneyStage[],
    asksHeading: 'Lo que necesitamos de Comercial',
    asks: [
      { title: 'Validar las fichas', text: 'Revisar en «VERSIÓN PULIDA» tus 6 momentos y marcar lo que no sea viable.' },
      { title: 'Confirmar dueños', text: 'Un responsable por cada envío, sin correos huérfanos.' },
      { title: 'Priorizar', text: 'Definir con qué cambios arrancamos y cuáles necesitan apoyo de plataforma.' },
      // «{fecha}» se reemplaza por FECHA_VALIDACION (o «[fecha]» resaltado si es null).
      { title: 'Fecha de validación', text: 'Respuesta del equipo a más tardar el {fecha}.' },
    ],
    notes:
      '≈10 min. Comercial ocupa Exploración y Definición. Cerrar con los acuerdos y una fecha de validación.',
  },
};

export type SlideKey = keyof typeof slides;
export const slideOrder: SlideKey[] = ['cover', 'asIs', 'toBe', 'timeline', 'journey'];
