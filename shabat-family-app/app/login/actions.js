'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { newSession, COOKIE_NAME } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function login(formData) {
  const name = String(formData.get('name') || '').trim();
  const passcode = String(formData.get('passcode') || '');
  if (!name) redirect('/login?error=1');

  let role = null;
  if (passcode === process.env.ADMIN_PASSCODE) role = 'admin';
  else if (passcode === process.env.FAMILY_PASSCODE) role = 'family';
  if (!role) redirect('/login?error=1');

  // remember this person so they show up in the shake/quotes/awards pickers
  await supabaseAdmin().from('family_members').upsert({ name });

  const value = newSession(role, name);
  cookies().set(COOKIE_NAME, value, {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 90,
  });
  redirect('/');
}

export async function logout() {
  cookies().delete(COOKIE_NAME);
  redirect('/login');
}
