'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/', label: 'הבית', icon: '🏠' },
  { href: '/trip', label: 'הטיול', icon: '📅' },
  { href: '/memories', label: 'זיכרונות', icon: '＋', center: true },
  { href: '/journey', label: 'המסע', icon: '🗺️' },
  { href: '/family', label: 'המשפחה', icon: '👨‍👩‍👧‍👦' },
];

export default function BottomNav() {
  const pathname = usePathname();
  if (pathname === '/login') return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-30 pointer-events-none">
      <div className="pointer-events-auto w-[calc(100%-28px)] max-w-[492px] mb-4 flex justify-around items-end
                      bg-white/85 backdrop-blur-md border border-white/60 rounded-[28px] py-3 px-1 shadow-xl">
        {ITEMS.map((it) => {
          const active = pathname === it.href;
          return (
            <Link key={it.href} href={it.href}
              className={`flex flex-col items-center gap-1 flex-1 text-[11.5px] font-extrabold ${active ? 'text-coral' : 'text-ink/50'}`}>
              {it.center ? (
                <span className="-mt-8 mb-1 w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white
                                 bg-gradient-to-br from-coral to-mango shadow-lg">＋</span>
              ) : (
                <span className="text-xl">{it.icon}</span>
              )}
              {it.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
