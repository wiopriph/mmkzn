const routes = ['/', '/nasha-produkcziya/', '/politika/', '/uslugi/', '/blog/',
  '/opgs/', '/pesok-rechnoj/', '/pesok-obogashhennyj-modul-krupnosti-ot-22-28/',
  '/gravij-frakczionnyj-5-20/', '/gravij-frakczionnyj-20/',
  '/shheben-izvestkovyj-frakczionnyj-20-40/', '/shheben-izvestkovyj-frakczionnyj-20-80/',
  '/shheben-izvestkovyj-frakczionnyj-40-70/']
const out = []
for (const r of routes) {
  const html = await (await fetch('http://localhost:3010' + r)).text()
  const pick = (re) => (html.match(re)?.[1] ?? '').trim()
  out.push({
    route: r,
    status: html.includes('<h1') ? 'ok' : 'NO H1',
    title: pick(/<title>([^<]*)<\/title>/),
    description: pick(/name="description" content="([^"]*)"/),
    robots: pick(/name="robots" content="([^"]*)"/),
    h1: pick(/<h1[^>]*>([\s\S]*?)<\/h1>/).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
  })
}
console.log(JSON.stringify(out, null, 1))
