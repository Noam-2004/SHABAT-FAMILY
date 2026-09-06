import Link from 'next/link';
import { getAllDays } from '@/lib/data';

export const dynamic = 'force-dynamic';

const GROUPS = [
  { label: '🇻🇳 האנוי', days: [2, 9] },
  { label: '🏔️ סאפה', days: [3, 4, 5] },
  { label: '🌾 נין בין / טאם קוק', days: [6, 7, 8] },
  { label: '🌴 קוסמוי', days: [11, 12, 13] },
  { label: '🌊 קופנגן', days: [14, 15, 16] },
  { label: '🏝️ קוסמוי · צ׳אוונג', days: [17, 18] },
  { label: '🌆 בנגקוק', days: [19] },
];

export default async function JourneyPage() {
  const days = await getAllDays();
  return (
    <div className="px-4 pt-5">
      <h1 className="font-extrabold text-2xl mb-1">המסע שלנו 🗺️</h1>
      <p className="text-sm opacity-60 mb-5">מוייטנאם הירוקה לתאילנד הטורקיזית</p>
      <div className="space-y-4">
        {GROUPS.map((g) => {
          const groupDays = days.filter((d) => g.days.includes(d.day));
          const cover = groupDays.find((d) => d.coverUrl)?.coverUrl;
          return (
            <Link key={g.label} href={`/day/${g.days[0]}`} className="flex gap-3 items-center bg-white rounded-xl2 shadow p-3">
              <div className="w-16 h-16 rounded-xl2 bg-cover bg-center shrink-0 bg-gradient-to-br from-ocean to-turquoise"
                   style={{ backgroundImage: cover ? `url(${cover})` : undefined }} />
              <div>
                <div className="font-extrabold">{g.label}</div>
                <div className="text-xs opacity-60">הזיכרונות בדרך ✨</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
