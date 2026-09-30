// Прогон карты 301 по живому серверу (раздел 8.1 PROMPT.md):
// каждый старый адрес должен отвечать ровно 301 с точным целевым URL,
// без промежуточных хопов. Запуск: BASE_URL=http://localhost:3000 npx tsx scripts/check-redirects.ts
import { redirects } from '../server/utils/redirects';


const base = process.env.BASE_URL ?? 'http://localhost:3000';
const entries = Object.entries(redirects);

if (entries.length === 0) {
  console.log('Карта редиректов пуста (фаза copy-first) — проверять нечего.');
  process.exit(0);
}

let failed = 0;

for (const [from, to] of entries) {
  const res = await fetch(base + from, { redirect: 'manual' });
  const location = res.headers.get('location');
  const ok = res.status === 301 && (location === to || location === base + to);

  if (!ok) {
    failed++;
    console.error(`FAIL ${from}: ожидали 301 → ${to}, получили ${res.status} → ${location}`);
  } else {
    console.log(`ok   ${from} → ${to}`);
  }
}

if (failed) {
  console.error(`\n${failed} из ${entries.length} редиректов сломаны`);
  process.exit(1);
}

console.log(`\nВся карта в порядке: ${entries.length} редиректов`);
