import { login } from './actions';

export default function LoginPage({ searchParams }) {
  const error = searchParams?.error;
  return (
    <div className="min-h-screen flex items-center justify-center px-6" dir="rtl">
      <form action={login} className="w-full max-w-sm bg-white rounded-xl2 shadow-xl p-7 space-y-4">
        <div className="text-center mb-2">
          <div className="font-extrabold text-2xl text-ocean">SHABAT FAMILY</div>
          <div className="text-sm text-ink/70 mt-1">כובשים את המזרח 🌏</div>
        </div>
        <p className="text-center font-bold text-lg">ברוכים הבאים לטיול המשפחתי</p>

        <input name="name" required placeholder="השם שלך" className="w-full border-2 rounded-lg2 px-4 py-3 text-base" />
        <input name="passcode" required type="password" placeholder="קוד המשפחה" className="w-full border-2 rounded-lg2 px-4 py-3 text-base" />

        {error && <p className="text-coral text-sm text-center font-bold">הקוד שגוי, נסו שוב</p>}

        <button className="w-full bg-gradient-to-l from-coral to-mango text-white font-extrabold rounded-full py-3.5 text-lg">
          כניסה
        </button>
        <p className="text-xs text-center text-ink/50">קוד המנהל פותח גם עריכה והעלאת תמונות</p>
      </form>
    </div>
  );
}
