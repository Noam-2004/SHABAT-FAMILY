'use server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from './supabaseAdmin';
import { getSession } from './session';

function requireAdmin() {
  const s = getSession();
  if (!s || s.role !== 'admin') throw new Error('Admin only');
  return s;
}
function requireSession() {
  const s = getSession();
  if (!s) throw new Error('Not logged in');
  return s;
}

export async function uploadPhotos(dayNum, formData) {
  const session = requireAdmin();
  const sb = supabaseAdmin();
  const files = formData.getAll('files');
  for (const file of files) {
    if (!file || !file.size) continue;
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `day-${dayNum}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error: upErr } = await sb.storage.from('photos').upload(path, bytes, { contentType: file.type || 'image/jpeg' });
    if (upErr) throw upErr;
    const { error: dbErr } = await sb.from('photos').insert({
      day: dayNum, storage_path: path, uploaded_by: session.name, original_filename: file.name,
    });
    if (dbErr) throw dbErr;
  }
  revalidatePath('/memories');
  revalidatePath('/');
  revalidatePath(`/day/${dayNum}`);
}

export async function toggleFavorite(photoId) {
  const session = requireSession();
  const sb = supabaseAdmin();
  const { data: existing } = await sb.from('photo_favorites').select('*').eq('photo_id', photoId).eq('favorited_by', session.name).maybeSingle();
  if (existing) await sb.from('photo_favorites').delete().eq('photo_id', photoId).eq('favorited_by', session.name);
  else await sb.from('photo_favorites').insert({ photo_id: photoId, favorited_by: session.name });
  revalidatePath('/memories');
}

export async function setDayCover(dayNum, photoId) {
  const session = requireAdmin();
  const sb = supabaseAdmin();
  await sb.from('day_covers').upsert({ day: dayNum, photo_id: photoId, set_by: session.name, updated_at: new Date().toISOString() });
  revalidatePath('/');
  revalidatePath('/trip');
  revalidatePath(`/day/${dayNum}`);
}

export async function saveShakePrefs(person, fruits, base, extras) {
  requireSession();
  const sb = supabaseAdmin();
  await sb.from('family_members').upsert({ name: person });
  await sb.from('shake_prefs').upsert({ person, fruits, base, extras, updated_at: new Date().toISOString() });
  revalidatePath('/family');
}

export async function saveTodayShake(dayNum, person, fruits, base, extras) {
  requireSession();
  const sb = supabaseAdmin();
  await sb.from('daily_shakes').upsert({ day: dayNum, person, fruits, base, extras, updated_at: new Date().toISOString() });
  revalidatePath('/family');
  revalidatePath('/');
}

export async function voteAward(award) {
  const session = requireSession();
  const sb = supabaseAdmin();
  await sb.from('award_votes').upsert({ award, voted_by: session.name });
  revalidatePath('/family');
}
