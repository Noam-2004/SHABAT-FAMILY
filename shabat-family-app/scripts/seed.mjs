// Run once after creating your Supabase project and setting .env.local:
//   npm run seed
// Safe to re-run — it upserts, so it won't duplicate rows.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { ITINERARY } from '../lib/itinerary.js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  for (const d of ITINERARY) {
    const { error: dayErr } = await supabase.from('trip_days').upsert({
      day: d.day, date: d.date, country: d.country, title: d.title, title_he: d.title_he,
      loc: d.loc, hotel: d.hotel, confirmed: d.confirmed,
    });
    if (dayErr) throw dayErr;

    await supabase.from('activities').delete().eq('day', d.day);
    if (d.activities.length) {
      const rows = d.activities.map((a, i) => ({
        day: d.day, sort_order: i, time: a.t, text_he: a.he, planned: !!a.planned,
      }));
      const { error } = await supabase.from('activities').insert(rows);
      if (error) throw error;
    }

    await supabase.from('attractions').delete().eq('day', d.day);
    if (d.attractions.length) {
      const rows = d.attractions.map((a) => ({ day: d.day, name_en: a.en, name_he: a.he }));
      const { error } = await supabase.from('attractions').insert(rows);
      if (error) throw error;
    }
    console.log('Seeded day', d.day, d.title_he);
  }
  console.log('Done. All 21 days seeded.');
}

main().catch((e) => { console.error(e); process.exit(1); });
