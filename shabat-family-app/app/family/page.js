import { AWARD_DEFS, FRUITS, BASES, EXTRAS, getTripStatus } from '@/lib/itinerary';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getSession } from '@/lib/session';
import { getStats } from '@/lib/data';
import { saveShakePrefs, saveTodayShake, voteAward } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function FamilyPage() {
  const session = getSession();
  const status = getTripStatus();
  const curDay = status.phase === 'before' ? 1 : status.phase === 'after' ? 21 : status.day.day;

  const sb = supabaseAdmin();
  const { data: members } = await sb.from('family_members').select('name').order('created_at');
  const { data: myPrefs } = await sb.from('shake_prefs').select('*').eq('person', session?.name || '').maybeSingle();
  const { data: todayShake } = await sb.from('daily_shakes').select('*').eq('day', curDay).maybeSingle();
  const { data: votes } = await sb.from('award_votes').select('award');
  const voteCounts = {};
  (votes || []).forEach((v) => { voteCounts[v.award] = (voteCounts[v.award] || 0) + 1; });
  const stats = await getStats();

  const myFruits = myPrefs?.fruits || [];
  const myBase = myPrefs?.base || [];
  const myExtras = myPrefs?.extras || [];
  const tFruits = todayShake?.fruits || [];
  const tBase = todayShake?.base || [];
  const tExtras = todayShake?.extras || [];

  async function savePrefsAction(formData) {
    'use server';
    const fruits = formData.getAll('fruits');
    const base = formData.getAll('base');
    const extras = formData.getAll('extras');
    await saveShakePrefs(session.name, fruits, base, extras);
  }
  async function saveTodayAction(formData) {
    'use server';
    const fruits = formData.getAll('t_fruits');
    const base = formData.getAll('t_base');
    const extras = formData.getAll('t_extras');
    await saveTodayShake(curDay, session.name, fruits, base, extras);
  }
  async function voteAction(formData) {
    'use server';
    await voteAward(formData.get('award'));
  }

  const Chip = ({ name, value, checked }) => (
    <label className={`chip ${checked ? 'sel' : ''}`}>
      <input type="checkbox" name={name} value={value} defaultChecked={checked} className="hidden" />
      {value}
    </label>
  );

  return (
    <div className="px-4 pt-5">
      <h1 className="font-extrabold text-2xl mb-5">המשפחה שלנו 👨‍👩‍👧‍👦</h1>

      <h2 className="font-extrabold text-xl mb-2">שייק היום 🥭</h2>
      <div className="bg-gradient-to-br from-white to-sand rounded-xl2 shadow p-5 mb-4">
        <form action={savePrefsAction}>
          <div className="font-bold mb-2">הטעמים שאני אוהב/ת ({session?.name})</div>
          <div className="flex flex-wrap gap-2 mb-2">{FRUITS.map((f) => <Chip key={f} name="fruits" value={f} checked={myFruits.includes(f)} />)}</div>
          <div className="flex flex-wrap gap-2 mb-2">{BASES.map((f) => <Chip key={f} name="base" value={f} checked={myBase.includes(f)} />)}</div>
          <div className="flex flex-wrap gap-2 mb-3">{EXTRAS.map((f) => <Chip key={f} name="extras" value={f} checked={myExtras.includes(f)} />)}</div>
          <button className="w-full border-2 border-ocean text-ocean font-extrabold rounded-full py-2.5">שמירת ההעדפות שלי</button>
        </form>
      </div>

      <div className="bg-gradient-to-br from-white to-sand rounded-xl2 shadow p-5 mb-6">
        <form action={saveTodayAction}>
          <div className="font-bold mb-2">בונים את השייק של היום</div>
          <div className="flex flex-wrap gap-2 mb-2">{FRUITS.map((f) => <Chip key={f} name="t_fruits" value={f} checked={tFruits.includes(f)} />)}</div>
          <div className="flex flex-wrap gap-2 mb-2">{BASES.map((f) => <Chip key={f} name="t_base" value={f} checked={tBase.includes(f)} />)}</div>
          <div className="flex flex-wrap gap-2 mb-3">{EXTRAS.map((f) => <Chip key={f} name="t_extras" value={f} checked={tExtras.includes(f)} />)}</div>
          <div className="text-center font-bold bg-white/70 rounded-lg2 p-3 mb-3">
            {[...tFruits, ...tBase, ...tExtras].length ? `השייק של היום: ${[...tFruits, ...tBase, ...tExtras].join(' + ')}` : 'עדיין לא נבחר שייק היום'}
          </div>
          <button className="w-full bg-gradient-to-l from-coral to-mango text-white font-extrabold rounded-full py-3">שומרים את השייק</button>
        </form>
      </div>

      <h2 className="font-extrabold text-xl mb-2">פרסי משפחת שבת 🏆</h2>
      <div className="space-y-2 mb-6">
        {AWARD_DEFS.map((a) => (
          <form action={voteAction} key={a} className="flex items-center justify-between bg-white rounded-xl2 shadow p-4">
            <input type="hidden" name="award" value={a} />
            <span className="font-bold text-sm">{a}</span>
            <button className="bg-sand rounded-full px-4 py-2 text-xs font-extrabold">הצבעה ({voteCounts[a] || 0})</button>
          </form>
        ))}
      </div>

      <h2 className="font-extrabold text-xl mb-2">סטטיסטיקת הטיול 🌏</h2>
      <div className="bg-white rounded-xl2 shadow p-5 grid grid-cols-2 gap-3 text-sm">
        <div>📍 יעדים <b>{stats.destinations}</b></div>
        <div>📸 זיכרונות <b>{stats.photoCount}</b></div>
        <div>❤️ מועדפים <b>{stats.favCount}</b></div>
        <div>🌅 יום נוכחי <b>{curDay}</b></div>
      </div>
    </div>
  );
}
