export const reasons = { salario: 'Salary', requisitos: 'Requirements', beneficios: 'Benefits' };

export const offers = [
  {
    id: 'altiplano-frontend', title: 'Frontend Developer', company: 'Altiplano Labs', initials: 'AL',
    location: 'La Paz, Bolivia', modality: 'Remote', seniority: 'Mid-level',
    salaryMin: 1200, salaryMax: 1800, currency: 'USD', salaryPeriod: 'month',
    description: 'Build tools that connect local businesses with new opportunities. Your code, with real impact.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    requirements: ['2+ years building web interfaces', 'React and TypeScript in production', 'Intermediate English for documentation'],
    benefits: ['Flexible hours', 'Work equipment', '15 days of paid leave'],
  },
  {
    id: 'valle-backend', title: 'Backend Developer', company: 'Valle Digital', initials: 'VD',
    location: 'Cochabamba, Bolivia', modality: 'Hybrid', seniority: 'Senior',
    salaryMin: 1800, salaryMax: 2600, currency: 'USD', salaryPeriod: 'month',
    description: 'Design reliable services for a new generation of digital products built in Bolivia.',
    stack: ['Node.js', 'PostgreSQL', 'Docker'],
    requirements: ['4+ years developing APIs', 'Relational database design', 'Two on-site days per week'],
    benefits: ['Health insurance', 'Technical training', 'Annual performance bonus'],
  },
  {
    id: 'oriente-fullstack', title: 'Full Stack Developer', company: 'Oriente Studio', initials: 'OS',
    location: 'Santa Cruz, Bolivia', modality: 'Remote', seniority: 'Junior',
    salaryMin: 700, salaryMax: 1100, currency: 'USD', salaryPeriod: 'month',
    description: 'Take your next step with a small team that designs and launches products from the first idea.',
    stack: ['JavaScript', 'Vue', 'Python'],
    requirements: ['1+ year of experience or personal projects', 'JavaScript and API fundamentals', 'Interest in learning as a team'],
    benefits: ['Weekly mentoring', 'Remote work', 'Learning Fridays'],
  },
];

// All initial feedback is fictional. It does not represent real participants or companies.
export const seedEvaluations = [
  ['altiplano-frontend', 'approve', [], ''],
  ['altiplano-frontend', 'approve', [], ''],
  ['altiplano-frontend', 'reject', ['salario'], 'Publish a more competitive salary range for the requested experience level.'],
  ['valle-backend', 'approve', [], ''],
  ['valle-backend', 'reject', ['requisitos', 'beneficios'], 'Offering a fully remote option would broaden access to talent.'],
  ['oriente-fullstack', 'reject', ['salario', 'requisitos'], 'Align the experience requirements with a junior position.'],
  ['oriente-fullstack', 'approve', [], ''],
  ['valle-backend', 'approve', [], ''],
].map(([offerId, vote, reasons, comment], i) => ({
  id: `seed-${i}`, offerId, vote, reasons, comment, createdAt: `2026-10-26T09:0${i}:00.000Z`,
}));
