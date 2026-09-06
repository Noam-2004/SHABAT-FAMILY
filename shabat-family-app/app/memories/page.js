import { ITINERARY, getTripStatus } from '@/lib/itinerary';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { signedUrl } from '@/lib/data';
import { getSession } from '@/lib/session';
import { uploadPhotos, toggleFavorite } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function MemoriesPage() {
  const session = getSession();
  const status = getTripStatus();
  const curDay = status.phase === 'before' ? 1 : status.phase === 'after' ? 21 : status.day.day;

  const sb = supabaseAdmin();
  const { data: photos } = await sb.from('photos').select('*').order('created_at', { ascending: false });
  const { data: favRows } = await sb.from('photo_favorites').select('*').eq('favorited_by', session?.name || '');
  const favIds = new Set((favRows || []).map((f) => f.photo_id));
  const withUrls = await Promise.all((photos || []).map(async (p) => ({ ...p, url: await signedUrl(sb, p.storage_path) })));

  const byDay = {};
  for (const p of withUrls) { (byDay[p.day] ||= []).push(p); }

  async function uploadAction(formData) {
    'use server';
    const dayNum = parseInt(formData.get('day'), 10);
    await uploadPhotos(dayNum, formData);
  }
  async function favAction(formData) {
    'use server';
    await toggleFavorite(formData.get('photoId'));
  }

  return (
    <div className="px-4 pt-5">
      <h1 className="font-extrabold text-2xl mb-4">הזיכרונות שלנו 📸</h1>

      {session?.role === 'admin' && (
        <form action={uploadAction} className="bg-white rounded-xl2 shadow p-4 mb-5" encType="multipart/form-data">
          <div className="text-sm font-bold mb-2">העלאה עבור:</div>
          <select name="day" defaultValue={curDay} className="w-full border rounded-lg2 p-3 mb-2">
            {ITINERARY.map((d) => <option key={d.day} value={d.day}>יום {d.day} — {d.title_he}</option>)}
          </select>
          <input type="file" name="files" multiple accept="image/*" className="w-full mb-2" />
          <button className="w-full bg-gradient-to-l from-coral to-mango text-white font-extrabold rounded-full py-3">
            ＋ הוספת תמונות
          </button>
        </form>
      )}

      <h2 className="font-extrabold text-lg mb-2">המועדפים שלי ❤️</h2>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {withUrls.filter((p) => favIds.has(p.id)).map((p) => (
          <div key={p.id} className="aspect-square rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${p.url})` }} />
        ))}
        {withUrls.filter((p) => favIds.has(p.id)).length === 0 && <div className="col-span-3 text-center opacity-60 py-6">אין עדיין מועדפים</div>}
      </div>

      <h2 className="font-extrabold text-lg mb-2">כל הזיכרונות</h2>
      {Object.keys(byDay).sort((a, b) => a - b).map((dayNum) => {
        const d = ITINERARY.find((x) => x.day == dayNum);
        return (
          <div key={dayNum} className="mb-5">
            <div className="font-bold text-sm mb-2">יום {dayNum} — {d?.title_he}</div>
            <div className="grid grid-cols-3 gap-2">
              {byDay[dayNum].map((p) => (
                <form action={favAction} key={p.id}>
                  <input type="hidden" name="photoId" value={p.id} />
                  <button className="relative w-full aspect-square rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${p.url})` }}>
                    {favIds.has(p.id) && <span className="absolute top-1 right-1">❤️</span>}
                  </button>
                </form>
              ))}
            </div>
          </div>
        );
      })}
      {withUrls.length === 0 && <p className="text-center opacity-60 py-8">＋ הוסיפו תמונות מהיום כדי להתחיל את אלבום המשפחה</p>}
    </div>
  );
}
