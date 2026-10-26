export const reasons = { salario: 'Salario', requisitos: 'Requisitos', beneficios: 'Beneficios' };

export const offers = [
  {
    id: 'altiplano-frontend', title: 'Frontend Developer', company: 'Altiplano Labs', initials: 'AL',
    location: 'La Paz, Bolivia', modality: 'Remoto', seniority: 'Mid-level',
    salaryMin: 1200, salaryMax: 1800, currency: 'USD', salaryPeriod: 'mes',
    description: 'Construye herramientas que conectan negocios locales con nuevas oportunidades. Tu código, con impacto real.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    requirements: ['2+ años creando interfaces web', 'React y TypeScript en producción', 'Inglés intermedio para documentación'],
    benefits: ['Horario flexible', 'Equipo de trabajo', '15 días de vacaciones'],
  },
  {
    id: 'valle-backend', title: 'Backend Developer', company: 'Valle Digital', initials: 'VD',
    location: 'Cochabamba, Bolivia', modality: 'Híbrido', seniority: 'Senior',
    salaryMin: 1800, salaryMax: 2600, currency: 'USD', salaryPeriod: 'mes',
    description: 'Diseña servicios confiables para una nueva generación de productos digitales hechos en Bolivia.',
    stack: ['Node.js', 'PostgreSQL', 'Docker'],
    requirements: ['4+ años desarrollando APIs', 'Diseño de bases de datos relacionales', 'Dos días presenciales por semana'],
    benefits: ['Seguro de salud', 'Formación técnica', 'Bono anual por resultados'],
  },
  {
    id: 'oriente-fullstack', title: 'Full Stack Developer', company: 'Oriente Studio', initials: 'OS',
    location: 'Santa Cruz, Bolivia', modality: 'Remoto', seniority: 'Junior',
    salaryMin: 700, salaryMax: 1100, currency: 'USD', salaryPeriod: 'mes',
    description: 'Da tu siguiente paso con un equipo pequeño que diseña y lanza productos desde la primera idea.',
    stack: ['JavaScript', 'Vue', 'Python'],
    requirements: ['1+ año de experiencia o proyectos propios', 'Fundamentos de JavaScript y APIs', 'Interés por aprender en equipo'],
    benefits: ['Mentoría semanal', 'Trabajo remoto', 'Viernes de aprendizaje'],
  },
];

// Todas estas opiniones son ficticias. No representan participantes ni empresas reales.
export const seedEvaluations = [
  ['altiplano-frontend', 'approve', [], ''],
  ['altiplano-frontend', 'approve', [], ''],
  ['altiplano-frontend', 'reject', ['salario'], 'Publicar un rango salarial más competitivo para el nivel solicitado.'],
  ['valle-backend', 'approve', [], ''],
  ['valle-backend', 'reject', ['requisitos', 'beneficios'], 'Ofrecer una opción totalmente remota ampliaría el acceso al talento.'],
  ['oriente-fullstack', 'reject', ['salario', 'requisitos'], 'Ajustar la experiencia requerida a una posición junior.'],
  ['oriente-fullstack', 'approve', [], ''],
  ['valle-backend', 'approve', [], ''],
].map(([offerId, vote, reasons, comment], i) => ({
  id: `seed-${i}`, offerId, vote, reasons, comment, createdAt: `2026-10-26T09:0${i}:00.000Z`,
}));
