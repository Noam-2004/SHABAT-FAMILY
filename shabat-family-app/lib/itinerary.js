// Seed data for the trip. Attraction/hero photos are intentionally left
// without images here — the Admin uploads real photos through the app itself
// (Memories tab / "make this the cover"), which is the whole point of a real
// backend: they land in Supabase Storage and sync to every device, instead of
// being baked into source code. Run `npm run seed` once after creating the
// Supabase project to load this into the database.

export const ITINERARY = [
  { day: 1, date: '2026-09-07', country: 'vn', title: 'Israel → Vietnam', title_he: 'ישראל ← וייטנאם', loc: 'בטיסה', hotel: null, confirmed: true,
    activities: [{ t: null, he: 'טיסה מישראל להאנוי ✈️' }], attractions: [] },
  { day: 2, date: '2026-09-08', country: 'vn', title: 'Hanoi', title_he: 'האנוי', loc: 'האנוי, וייטנאם', hotel: 'Le Premier Hotel & Rooftop Bar', confirmed: true,
    activities: [
      { t: '14:00', he: 'הסעה: שדה נמל התעופה נוֹי בַּאי ← מלון Le Premier (טיסה IZ595)' },
      { t: null, he: 'הרובע העתיק', planned: true },
      { t: null, he: 'אגם האן קיאם', planned: true },
      { t: null, he: 'מקדש נגוק סון', planned: true },
      { t: null, he: 'רחוב הרכבת', planned: true },
      { t: null, he: 'Vincom Center Metropolis / Lotte Mall West Lake', planned: true },
    ],
    attractions: [
      { en: 'Hanoi Old Quarter', he: 'הרובע העתיק של האנוי' },
      { en: 'Hoan Kiem Lake', he: 'אגם האן קיאם' },
      { en: 'Ngoc Son Temple', he: 'מקדש נגוק סון' },
      { en: 'Train Street', he: 'רחוב הרכבת' },
    ] },
  { day: 3, date: '2026-09-09', country: 'vn', title: 'Sapa', title_he: 'סאפה', loc: 'סאפה, וייטנאם', hotel: 'Silk Path Grand Sapa Resort & Spa', confirmed: true,
    activities: [
      { t: '09:00', he: 'הסעה: האנוי ← סאפה, לימוזינת 9 מקומות פרטית' },
      { t: null, he: 'Moana Sapa', planned: true },
      { t: null, he: 'מרכז העיר סאפה', planned: true },
      { t: null, he: 'הכנסייה מאבן', planned: true },
      { t: null, he: 'כיכר העיר', planned: true },
      { t: null, he: 'השוק הלילי', planned: true },
    ],
    attractions: [
      { en: 'Sapa Rice Terraces', he: 'טרסות האורז של סאפה' },
      { en: 'Sapa Stone Church', he: 'הכנסייה מאבן' },
      { en: 'Sapa Night Market', he: 'השוק הלילי' },
    ] },
  { day: 4, date: '2026-09-10', country: 'vn', title: 'Sapa · Fansipan', title_he: 'סאפה · פנסיפאן', loc: 'סאפה, וייטנאם', hotel: 'Silk Path Grand Sapa Resort & Spa', confirmed: true,
    activities: [
      { t: '08:30', he: 'תחילת סיור פרטי' },
      { t: null, he: 'הר פנסיפאן (רכבל + פסגה)' },
      { t: null, he: 'ארוחת צהריים בסאפה' },
      { t: null, he: 'מגלשת ההרים (Alpine Coaster)' },
      { t: null, he: 'גשר הזכוכית רונג מיי' },
      { t: '18:30', he: 'שקיעה במעבר או קווי הו' },
    ],
    attractions: [
      { en: 'Fansipan', he: 'הר פנסיפאן' },
      { en: 'Muong Hoa Train', he: 'רכבת מיונג הואה' },
      { en: 'Alpine Coaster', he: 'מגלשת ההרים' },
      { en: 'Rong May Glass Bridge', he: 'גשר הזכוכית רונג מיי' },
      { en: 'O Quy Ho Pass', he: 'נקודת השקיעה או קווי הו 🌅' },
    ] },
  { day: 5, date: '2026-09-11', country: 'vn', title: 'Sapa · Valleys', title_he: 'סאפה · העמקים', loc: 'סאפה, וייטנאם', hotel: 'Silk Path Grand Sapa Resort & Spa', confirmed: true,
    activities: [
      { t: '08:30', he: 'תחילת סיור פרטי' },
      { t: null, he: 'מפל האהבה' },
      { t: null, he: 'שער גן עדן' },
      { t: null, he: 'מעבר או קווי הו' },
      { t: null, he: 'ארוחת צהריים' },
      { t: null, he: 'עמק מיונג הואה' },
      { t: null, he: 'כפר לאו צ׳אי' },
      { t: '18:30', he: 'כפר טה ואן' },
    ],
    attractions: [
      { en: 'Love Waterfall', he: 'מפל האהבה' },
      { en: 'Heaven Gate', he: 'שער גן עדן' },
      { en: 'Muong Hoa Valley', he: 'עמק מיונג הואה' },
      { en: 'Lao Chai Village', he: 'כפר לאו צ׳אי' },
      { en: 'Ta Van Village', he: 'כפר טה ואן' },
    ] },
  { day: 6, date: '2026-09-12', country: 'vn', title: 'Sapa → Tam Coc', title_he: 'סאפה ← טאם קוק', loc: 'נין בין, וייטנאם', hotel: 'Emeralda Resort Tam Coc', confirmed: true,
    activities: [
      { t: '07:30', he: 'הסעה: סאפה ← נין בין, לימוזינת 9 מקומות פרטית' },
      { t: null, he: 'הגעה והתארגנות' },
      { t: null, he: 'עצירה לארוחת צהריים' },
      { t: null, he: 'נקודת התצפית האנג מואה', planned: true },
    ],
    attractions: [{ en: 'Hang Mua Viewpoint', he: 'נקודת התצפית האנג מואה' }] },
  { day: 7, date: '2026-09-13', country: 'vn', title: 'Ninh Binh', title_he: 'נין בין', loc: 'נין בין, וייטנאם', hotel: 'Emeralda Resort Tam Coc', confirmed: true,
    activities: [
      { t: null, he: 'הרפתקת ATV', planned: true },
      { t: null, he: 'בירת הואה לו העתיקה', planned: true },
      { t: null, he: 'ארוחת צהריים' },
      { t: null, he: 'פגודת ביץ׳ דונג', planned: true },
      { t: null, he: 'סיור סירות בטראנג אן', planned: true },
    ],
    attractions: [
      { en: 'Hoa Lu Ancient Capital', he: 'בירת הואה לו העתיקה' },
      { en: 'Bich Dong Pagoda', he: 'פגודת ביץ׳ דונג' },
      { en: 'Trang An Boat Tour', he: 'סיור סירות בטראנג אן' },
    ] },
  { day: 8, date: '2026-09-14', country: 'vn', title: 'Tam Coc → Hanoi', title_he: 'טאם קוק ← האנוי', loc: 'האנוי, וייטנאם', hotel: 'Le Premier Hotel & Rooftop Bar', confirmed: true,
    activities: [
      { t: null, he: 'שיט סירות בטאם קוק', planned: true },
      { t: '12:00', he: 'הסעה: נין בין ← האנוי, לימוזינה פרטית' },
      { t: null, he: 'מגדל התצפית לוטה', planned: true },
      { t: null, he: 'Lotte Mall West Lake', planned: true },
    ],
    attractions: [{ en: 'Tam Coc Boat Ride', he: 'שיט סירות בטאם קוק' }] },
  { day: 9, date: '2026-09-15', country: 'vn', title: 'Hanoi Shopping', title_he: 'קניות בהאנוי', loc: 'האנוי, וייטנאם', hotel: 'Le Premier Hotel & Rooftop Bar', confirmed: true,
    activities: [
      { t: null, he: 'Vincom Center / Lotte Mall', planned: true },
      { t: null, he: 'קניות ברובע העתיק: Hang Gai, Hang Bac, Hang Ma', planned: true },
      { t: null, he: 'סיור אוכל ברחובות הרובע העתיק', planned: true },
    ],
    attractions: [{ en: 'Old Quarter shopping streets', he: 'רחובות הקניות ברובע העתיק' }] },
  { day: 10, date: '2026-09-16', country: 'vn', title: 'Vietnam → Thailand', title_he: 'וייטנאם ← תאילנד', loc: 'בדרך לקוסמוי', hotel: 'Celec Samui Hotel (Bophut Beach)', confirmed: true,
    activities: [
      { t: '06:00', he: 'הסעה: מלון האנוי ← שדה נוֹי בַּאי (טיסה VN611)' },
      { t: null, he: 'טיסה: האנוי ← בנגקוק (Vietnam Airlines)' },
      { t: null, he: 'טיסה: בנגקוק ← קוסמוי (Bangkok Airways)' },
    ], attractions: [] },
  { day: 11, date: '2026-09-17', country: 'th', title: 'Koh Samui', title_he: 'קוסמוי', loc: 'בופוט ביץ׳, קוסמוי', hotel: 'Celec Samui Hotel', confirmed: false,
    activities: [], attractions: [{ en: 'Bophut Beach', he: 'בופוט ביץ׳' }] },
  { day: 12, date: '2026-09-18', country: 'th', title: 'Koh Samui', title_he: 'קוסמוי', loc: 'בופוט ביץ׳, קוסמוי', hotel: 'Celec Samui Hotel', confirmed: false,
    activities: [], attractions: [{ en: 'Bophut Beach sunset', he: 'שקיעה בבופוט ביץ׳' }] },
  { day: 13, date: '2026-09-19', country: 'th', title: 'Koh Samui', title_he: 'קוסמוי', loc: 'בופוט ביץ׳, קוסמוי', hotel: 'Celec Samui Hotel', confirmed: false,
    activities: [], attractions: [] },
  { day: 14, date: '2026-09-20', country: 'th', title: 'Koh Phangan', title_he: 'קופנגן', loc: 'קופנגן', hotel: 'Buri Rasa Village Koh Phangan', confirmed: true,
    activities: [{ t: null, he: 'נסיעה לקופנגן' }], attractions: [{ en: 'Koh Phangan beach', he: 'חוף קופנגן' }] },
  { day: 15, date: '2026-09-21', country: 'th', title: 'Koh Phangan', title_he: 'קופנגן', loc: 'קופנגן', hotel: 'Buri Rasa Village Koh Phangan', confirmed: false,
    activities: [], attractions: [] },
  { day: 16, date: '2026-09-22', country: 'th', title: 'Koh Phangan', title_he: 'קופנגן', loc: 'קופנגן', hotel: 'Buri Rasa Village Koh Phangan', confirmed: false,
    activities: [], attractions: [] },
  { day: 17, date: '2026-09-23', country: 'th', title: 'Koh Samui · Chaweng', title_he: 'קוסמוי · צ׳אוונג', loc: 'צ׳אוונג, קוסמוי', hotel: 'Marasca Samui Hotel', confirmed: true,
    activities: [{ t: null, he: 'חזרה לקוסמוי' }], attractions: [{ en: 'Chaweng Beach', he: 'חוף צ׳אוונג' }] },
  { day: 18, date: '2026-09-24', country: 'th', title: 'Koh Samui', title_he: 'קוסמוי', loc: 'צ׳אוונג, קוסמוי', hotel: 'Marasca Samui Hotel', confirmed: false,
    activities: [], attractions: [] },
  { day: 19, date: '2026-09-25', country: 'th', title: 'Koh Samui → Bangkok', title_he: 'קוסמוי ← בנגקוק', loc: 'בנגקוק, תאילנד', hotel: 'Pathumwan Princess Hotel', confirmed: true,
    activities: [{ t: null, he: 'טיסה: קוסמוי ← בנגקוק (Bangkok Airways)' }], attractions: [{ en: 'Bangkok skyline', he: 'קו הרקיע של בנגקוק' }] },
  { day: 20, date: '2026-09-26', country: 'th', title: 'Thailand → Israel', title_he: 'תאילנד ← ישראל', loc: 'בטיסה', hotel: null, confirmed: true,
    activities: [{ t: null, he: 'טיסה חזרה לישראל ✈️' }], attractions: [] },
  { day: 21, date: '2026-09-27', country: 'il', title: 'Home', title_he: 'הבית', loc: 'ישראל', hotel: null, confirmed: true,
    activities: [{ t: null, he: 'נחיתה בישראל 🇮🇱' }], attractions: [] },
];

export const AWARD_DEFS = [
  '⏰ תמיד אחרונים ללובי', '📸 הצלם המשפחתי', '🥥 אלוף הקוקוסים', '🛍️ אלופת הקניות',
  '😴 ישן בכל נסיעה', '🍜 הכי הרפתקן/ית באוכל', '🌴 מלך/מלכת הבטן־גב',
];

export const FRUITS = ['🥭 מנגו','🍍 אננס','🍌 בננה','🍓 תות','🥥 קוקוס','🍉 אבטיח','🥝 קיווי','🍊 תפוז','🍋 ליים','🐉 דרגון פרוט','🍑 אפרסק','🍈 מלון'];
export const BASES = ['🥛 חלב','🥥 חלב קוקוס','🌱 חלב שקדים','🥣 יוגורט','💧 מים','🧊 קרח'];
export const EXTRAS = ['🍯 דבש','🌿 נענע','🥜 חמאת בוטנים','🍫 שוקולד','🌱 צ׳יה','🥣 גרנולה'];

export function getTripStatus(now = new Date()) {
  const start = new Date('2026-09-07T00:00:00');
  const end = new Date('2026-09-27T23:59:59');
  const tzDate = (tz) => new Date(now.toLocaleString('en-US', { timeZone: tz })).toISOString().slice(0, 10);
  if (now < start) {
    const daysToGo = Math.ceil((start - now) / 86400000);
    return { phase: 'before', daysToGo };
  }
  if (now > end) return { phase: 'after' };
  for (const d of ITINERARY) {
    const tz = d.country === 'th' ? 'Asia/Bangkok' : d.country === 'vn' ? 'Asia/Ho_Chi_Minh' : 'Asia/Jerusalem';
    if (tzDate(tz) === d.date) return { phase: 'during', day: d };
  }
  const idx = Math.min(ITINERARY.length - 1, Math.max(0, Math.floor((now - start) / 86400000)));
  return { phase: 'during', day: ITINERARY[idx] };
}
