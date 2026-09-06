import './globals.css';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'SHABAT FAMILY',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body className="font-sans text-ink">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
