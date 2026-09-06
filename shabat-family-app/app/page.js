import { getTripStatus, ITINERARY } from '@/lib/itinerary';
import { getDay } from '@/lib/data';
import { getSession } from '@/lib/session';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // always compute today's status fresh

export default async function HomePage() {
  const session = getSession();
  const status = getTripStatus();

  let dayNum, headline, sub, loc, badge;
  if (status.phase === 'before') {
    dayNum = 1; badge = `עוד ${status.daysToGo} ימים לטיסה`;
    headline = 'כובשים את המזרח'; sub = 'SHABAT FAMILY TAKES ASIA 🌏'; loc = '📍 היעד הבא: Hanoi, וייטנאם 🇻🇳';
  } else if (status.phase === 'after') {
    dayNum = 21; badge = 'הטיול הסתיים ❤️';
    headline = 'WHAT A TRIP ❤️'; sub = 'איזה מסע'; loc = '📍 בבית, בישראל 🇮🇱';
  } else {
    dayNum = status.day.day; badge = `יום ${dayNum} מתוך 21`;
    headline = status.day.title_he; sub = 'בוקר טוב, משפחת שבת ☀️';
    loc = `📍 ${status.day.loc} ${status.day.country === 'th' ? '🇹🇭' : status.day.country === 'vn' ? '🇻🇳' : '🇮🇱'}`;
  }

  const day = await getDay(dayNum);
  const tmr = status.phase === 'during' ? await getDay(Math.min(21, dayNum + 1)) : null;

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-4">
        <div className="font-extrabold text-lg text-ocean">SHABAT FAMILY<span className="block text-xs font-semibold opacity-70">כובשים את המזרח 🌏</span></div>
        <Link href="/login" className="text-xs font-bold bg-white rounded-full px-3 py-1.5 shadow">{session?.name} · {session?.role === 'admin' ? 'מנהל' : 'משפחה'}</Link>
      </div>

      <div className="relative mx-4 rounded-xl2 overflow-hidden min-h-[280px] flex flex-col justify-end p-6 text-white shadow-xl"
           style={{ backgroundImage: day?.coverUrl ? `url(${day.coverUrl})` : 'linear-gradient(135deg,#1c7fb5,#0aa7a0)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="relative">
          <span className="text-xs font-bold bg-white/20 border border-white/30 rounded-full px-3 py-1">{badge}</span>
          <div className="text-sm font-semibold opacity-90 mt-3">{sub}</div>
          <div className="text-3xl font-extrabold mt-1">{headline}</div>
          <div className="text-sm font-bold mt-2">{loc}</div>
        </div>
      </div>

      <div className="px-4 mt-8">
        <h2 className="font-extrabold text-xl mb-3">מה עושים היום? ✨</h2>
        <div className="bg-white/70 backdrop-blur rounded-xl2 p-5 shadow">
          {status.phase === 'before' && <p className="text-sm opacity-70">אורזים, מדפיסים כרטיסים, וסופרים ימים — האנוי מחכה.</p>}
          {status.phase !== 'before' && day && (day.activities.length ? (
            <ul className="space-y-3">
              {day.activities.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="text-xs font-extrabold text-ocean w-11 shrink-0 pt-0.5">{a.time || ''}</span>
                  <span className="font-semibold text-[15px]">{a.text_he}{a.planned && <span className="ms-2 text-[10px] font-bold bg-sand text-ink/70 rounded-full px-2 py-0.5">מתוכנן</span>}</span>
                </li>
              ))}
            </ul>
          ) : <p className="text-center opacity-60 py-4">יום חופשי 🌴<br/><span className="text-xs">התוכניות בקרוב</span></p>)}
        </div>
      </div>

      {day?.attractions?.length > 0 && (
        <div className="mt-8">
          <h2 className="font-extrabold text-xl mb-3 px-4">המקומות שמחכים לנו היום</h2>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2">
            {day.attractions.map((a) => (
              <div key={a.id} className="relative shrink-0 w-[78%] h-[220px] rounded-xl2 overflow-hidden shadow-lg bg-gradient-to-br from-ocean to-turquoise">
                {a.image_path && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${a.image_path})` }} />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 inset-x-4 text-white">
                  <div className="font-extrabold text-lg" dir="ltr">{a.name_en}</div>
                  <div className="text-sm opacity-90">{a.name_he}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 mt-8">
        <Link href="/family" className="block bg-gradient-to-l from-turquoise to-ocean rounded-xl2 shadow p-4 text-white flex justify-between items-center">
          <div><div className="font-extrabold">🥤 שייק היום</div><div className="text-xs opacity-90">לחצו לבחירת השייק בלשונית המשפחה</div></div>
          <span>←</span>
        </Link>
      </div>

      {status.phase === 'during' && tmr && (
        <div className="px-4 mt-8">
          <h2 className="font-extrabold text-xl mb-3">מחר בטיול ✨</h2>
          <div className="rounded-xl2 overflow-hidden shadow-lg flex min-h-[170px]">
            <div className="w-[42%] bg-cover bg-center" style={{ backgroundImage: tmr.coverUrl ? `url(${tmr.coverUrl})` : 'linear-gradient(135deg,#ff6f5e,#ffb238)' }} />
            <div className="flex-1 bg-sand p-4 flex flex-col justify-center gap-1">
              <div className="font-extrabold">{day?.title_he} ← {tmr.title_he}</div>
              {tmr.hotel && tmr.hotel !== day?.hotel && <div className="text-xs">🏨 מלון חדש: <span dir="ltr">{tmr.hotel}</span></div>}
            </div>
          </div>
        </div>
      )}

      <div className="px-4 mt-8">
        <Link href="/memories" className="block w-full text-center bg-gradient-to-l from-coral to-mango text-white font-extrabold rounded-full py-4">
          ＋ הוספת תמונות מהיום
        </Link>
      </div>
    </div>
  );
}
