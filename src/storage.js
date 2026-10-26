import { addEvaluation, validateEvaluations } from './model.js';

export const STORAGE_KEY = 'jobpulse.demo.v1';

export function loadEvaluations(storage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null) return [];
  const data = JSON.parse(raw);
  if (data?.version !== 1) throw new Error('Versión de datos locales inválida.');
  return validateEvaluations(data.evaluations);
}

export function saveEvaluations(storage, entries) {
  validateEvaluations(entries);
  storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, evaluations: entries }));
  return entries;
}

export function commitEvaluation(storage, entries, evaluation) {
  const next = addEvaluation(entries, evaluation);
  return saveEvaluations(storage, next);
}

export function resetDemo(storage) {
  return saveEvaluations(storage, []);
}
