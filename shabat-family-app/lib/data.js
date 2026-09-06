import { supabaseAdmin } from './supabaseAdmin';

export async function getDay(dayNum) {
  const sb = supabaseAdmin();
  const { data: day } = await sb.from('trip_days').select('*').eq('day', dayNum).single();
  if (!day) return null;
  const { data: activities } = await sb.from('activities').select('*').eq('day', dayNum).order('sort_order');
  const { data: attractions } = await sb.from('attractions').select('*').eq('day', dayNum);
  const { data: photos } = await sb.from('photos').select('*').eq('day', dayNum).order('created_at');
  const { data: cover } = await sb.from('day_covers').select('*').eq('day', dayNum).maybeSingle();
  const photosWithUrls = await attachSignedUrls(sb, photos || []);
  let coverUrl = null;
  if (cover?.photo_id) {
    const p = photosWithUrls.find((x) => x.id === cover.photo_id);
    coverUrl = p?.url || null;
  } else if (day.hero_image_path) {
    coverUrl = await signedUrl(sb, day.hero_image_path);
  }
  return { ...day, activities: activities || [], attractions: attractions || [], photos: photosWithUrls, coverUrl };
}

export async function getAllDays() {
  const sb = supabaseAdmin();
  const { data: days } = await sb.from('trip_days').select('*').order('day');
  const { data: covers } = await sb.from('day_covers').select('*');
  const { data: allPhotos } = await sb.from('photos').select('*');
  const withCovers = await Promise.all((days || []).map(async (d) => {
    const cover = covers?.find((c) => c.day === d.day);
    let coverUrl = null;
    if (cover?.photo_id) {
      const p = allPhotos?.find((x) => x.id === cover.photo_id);
      if (p) coverUrl = await signedUrl(sb, p.storage_path);
    } else if (d.hero_image_path) {
      coverUrl = await signedUrl(sb, d.hero_image_path);
    }
    return { ...d, coverUrl };
  }));
  return withCovers;
}

export async function signedUrl(sb, path) {
  if (!path) return null;
  const { data } = await sb.storage.from('photos').createSignedUrl(path, 60 * 60); // 1 hour
  return data?.signedUrl || null;
}

async function attachSignedUrls(sb, photos) {
  return Promise.all(photos.map(async (p) => ({ ...p, url: await signedUrl(sb, p.storage_path) })));
}

export async function getFavoriteIdsFor(name) {
  const sb = supabaseAdmin();
  const { data } = await sb.from('photo_favorites').select('photo_id').eq('favorited_by', name);
  return new Set((data || []).map((r) => r.photo_id));
}

export async function getStats() {
  const sb = supabaseAdmin();
  const [{ count: photoCount }, { data: favs }, { data: days }] = await Promise.all([
    sb.from('photos').select('*', { count: 'exact', head: true }),
    sb.from('photo_favorites').select('photo_id'),
    sb.from('trip_days').select('day,loc'),
  ]);
  return { photoCount: photoCount || 0, favCount: favs?.length || 0, destinations: new Set((days || []).map((d) => d.loc)).size };
}
