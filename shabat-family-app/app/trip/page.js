import Link from 'next/link';
import { getAllDays } from '@/lib/data';
import { getTripStatus } from '@/lib/itinerary';

export const dynamic = 'force-dynamic';

export default async function TripPage() {
  const days = await getAllDays();
  const status = getTripStatus();
  const curNum = status.phase === 'before' ? 0 : status.phase === 'after' ? 22 : status.day.day;

  return (
    <div className="px-4 pt-5">
      <h1 className="font-extrabold text-2xl mb-1">הטיול שלנו</h1>
      <p className="text-sm opacity-60 mb-4">לחצו על כל יום כדי לראות פרטים מלאים</p>
      <div className="space-y-3">
        {days.map((d) => {
          const isToday = d.day === curNum;
          const isFree = !d.confirmed && d.country !== 'il';
          return (
            <Link key={d.day} href={`/day/${d.day}`}
              className={`flex rounded-xl2 overflow-hidden shadow bg-white border ${isToday ? 'border-coral border-2' : 'border-black/5'}`}>
              <div className="w-28 shrink-0 bg-cover bg-center bg-gradient-to-br from-ocean to-turquoise"
                   style={{ backgroundImage: d.coverUrl ? `url(${d.coverUrl})` : undefined }} />
              <div className="p-3 flex-1">
                <div className="text-[11px] font-extrabold text-ocean">יום {d.day} · {d.date?.slice(5).replace('-', '/')}</div>
                <div className="font-extrabold text-lg">{d.title_he}</div>
                <div className="text-sm opacity-65">{isFree ? 'התוכניות בקרוב 🌴' : (d.hotel ? <span dir="ltr">{d.hotel}</span> : d.loc)}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
