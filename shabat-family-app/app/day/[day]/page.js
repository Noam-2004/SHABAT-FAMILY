import { getDay } from '@/lib/data';
import { getSession } from '@/lib/session';
import { setDayCover } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function DayPage({ params }) {
  const dayNum = parseInt(params.day, 10);
  const day = await getDay(dayNum);
  const session = getSession();
  if (!day) return <div className="p-6">היום לא נמצא</div>;

  async function makeCoverAction(formData) {
    'use server';
    const photoId = formData.get('photoId');
    await setDayCover(dayNum, photoId);
  }

  return (
    <div>
      <div className="relative h-64 bg-cover bg-center bg-gradient-to-br from-ocean to-turquoise"
           style={{ backgroundImage: day.coverUrl ? `url(${day.coverUrl})` : undefined }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 right-5 text-white font-extrabold text-2xl">יום {day.day} — {day.title_he}</div>
      </div>
      <div className="px-5 pt-4">
        {day.hotel && <div className="text-sm mb-1">🏨 <span dir="ltr">{day.hotel}</span></div>}
        <div className="text-xs opacity-60 mb-4">📍 {day.loc}</div>

        <h2 className="font-extrabold text-lg mb-2">היום שלנו</h2>
        {day.activities.length ? (
          <ul className="space-y-3 mb-6">
            {day.activities.map((a) => (
              <li key={a.id} className="flex gap-3">
                <span className="text-xs font-extrabold text-ocean w-11 shrink-0">{a.time || ''}</span>
                <span className="font-semibold">{a.text_he}{a.planned && <span className="ms-2 text-[10px] bg-sand rounded-full px-2 py-0.5">מתוכנן</span>}</span>
              </li>
            ))}
          </ul>
        ) : <p className="opacity-60 text-center py-4 mb-6">יום חופשי 🌴</p>}

        {day.attractions.length > 0 && (
          <>
            <h2 className="font-extrabold text-lg mb-2">המקומות שנראה היום ✨</h2>
            <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2 mb-6">
              {day.attractions.map((a) => (
                <div key={a.id} className="shrink-0 w-56 h-36 rounded-xl2 overflow-hidden bg-gradient-to-br from-ocean to-turquoise relative">
                  {a.image_path && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${a.image_path})` }} />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 right-3 text-white">
                    <div className="font-extrabold text-sm" dir="ltr">{a.name_en}</div>
                    <div className="text-xs">{a.name_he}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="font-extrabold text-lg mb-2">הזיכרונות שלנו 📸</h2>
        {day.photos.length ? (
          <>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {day.photos.map((p) => (
                <div key={p.id} className="aspect-square rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${p.url})` }} />
              ))}
            </div>
            {session?.role === 'admin' && (
              <form action={makeCoverAction} className="mb-8">
                <select name="photoId" className="w-full border rounded-lg2 p-3 mb-2">
                  {day.photos.map((p) => <option key={p.id} value={p.id}>{p.original_filename || p.id}</option>)}
                </select>
                <button className="w-full bg-white border-2 border-ocean text-ocean font-extrabold rounded-full py-3">
                  הפוך לתמונת השער של היום
                </button>
              </form>
            )}
          </>
        ) : <p className="opacity-60 text-center py-6 mb-6">הזיכרונות בדרך ✨</p>}
      </div>
    </div>
  );
}
