import type { Intent } from '../data/chatbotKnowledge';

export function matchIntent(input: string, intents: Intent[]): Intent | null {
  const normalized = input.toLowerCase();
  let best: { intent: Intent; score: number } | null = null;

  for (const intent of intents) {
    const score = intent.keywords.filter((kw) => normalized.includes(kw)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { intent, score };
    }
  }

  return best ? best.intent : null;
}
