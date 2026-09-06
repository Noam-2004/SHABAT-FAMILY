import crypto from 'crypto';

const SECRET = process.env.SESSION_SECRET;
export const COOKIE_NAME = 'shabat_session';

function sign(value) {
  return crypto.createHmac('sha256', SECRET).update(value).digest('hex');
}

// payload: { role: 'admin' | 'family', name: string, exp: number }
export function createSessionValue(payload) {
  const json = JSON.stringify(payload);
  const base = Buffer.from(json).toString('base64url');
  const sig = sign(base);
  return `${base}.${sig}`;
}

export function readSessionValue(cookieValue) {
  if (!cookieValue) return null;
  const [base, sig] = cookieValue.split('.');
  if (!base || !sig) return null;
  if (sign(base) !== sig) return null; // tampered or wrong secret
  try {
    const payload = JSON.parse(Buffer.from(base, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null; // expired
    return payload;
  } catch {
    return null;
  }
}

export function newSession(role, name) {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 90; // 90 days
  return createSessionValue({ role, name, exp });
}
