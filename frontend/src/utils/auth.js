const API_BASE = 'http://127.0.0.1:8000';

function storageKey(key) { return `studybuddy:${key}`; }

export async function register({ username, email, role, password, confirm_password }) {
  const res = await fetch(`${API_BASE}/api/users/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, role, password, confirm_password })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Registration failed');
  }
  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/api/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    const err = (json && (json.detail || JSON.stringify(json))) || 'Login failed';
    throw new Error(err);
  }
  const data = await res.json();
  // store tokens
  localStorage.setItem(storageKey('access'), data.access);
  if (data.refresh) localStorage.setItem(storageKey('refresh'), data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem(storageKey('access'));
  localStorage.removeItem(storageKey('refresh'));
  localStorage.removeItem(storageKey('user'));
}

export function getAccessToken() {
  return localStorage.getItem(storageKey('access'));
}

export function getRefreshToken() {
  return localStorage.getItem(storageKey('refresh'));
}

// NOTE: Assumption: refresh endpoint is at /api/users/token/refresh/ and expects { refresh }
export async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  const res = await fetch(`${API_BASE}/api/users/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  });
  if (!res.ok) {
    // failed to refresh
    logout();
    return null;
  }
  const data = await res.json();
  if (data.access) localStorage.setItem(storageKey('access'), data.access);
  return data.access;
}

export function setUserInfo(user) {
  if (!user) localStorage.removeItem(storageKey('user'));
  else localStorage.setItem(storageKey('user'), JSON.stringify(user));
}

export function getUserInfo() {
  try { return JSON.parse(localStorage.getItem(storageKey('user'))); } catch (e) { return null; }
}

export async function fetchWithAuth(input, init={}) {
  let access = getAccessToken();
  if (!access) {
    access = await refreshAccessToken();
    if (!access) throw new Error('Not authenticated');
  }
  const headers = new Headers(init.headers || {});
  headers.set('Authorization', `Bearer ${access}`);
  headers.set('Content-Type', headers.get('Content-Type') || 'application/json');
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401) {
    // try refresh once
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      headers.set('Authorization', `Bearer ${newAccess}`);
      return fetch(input, { ...init, headers });
    }
  }
  return res;
}

export default { register, login, logout, getAccessToken, getRefreshToken, refreshAccessToken, fetchWithAuth, setUserInfo, getUserInfo };
