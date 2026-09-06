import { cookies } from 'next/headers';
import { readSessionValue, COOKIE_NAME } from './auth';

// Use in Server Components / Server Actions only.
export function getSession() {
  const value = cookies().get(COOKIE_NAME)?.value;
  return readSessionValue(value); // { role, name, exp } or null
}
