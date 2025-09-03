import {getToken, clearToken} from "./auth.js";

// Ajuste via .env: VITE_API_BASE="http://localhost:3000"
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000';

export async function apiFetch(path, options = {}) {
    const token = getToken();
    const headers = {
        Accept: "application/json",
        ...(options.body && !(options.headers?.['Content-Type']) ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'omit', // mude para 'include' se usar cookies
        ...options,
        headers,
    });

    const ct = res.headers.get('content-type') || '';
    const parse = async () => (ct.includes('application/json') ? await res.json() : await res.text());

    if (!res.ok) {
        const payload = await parse().catch(() => null);
        const err = new Error(payload?.message || `HTTP ${res.status}`);
        err.status = res.status;
        err.body = payload;
        if (res.status === 401) clearToken(); // expulsa token inválido/expirado
        throw err;
    }

    return parse();

}//Fim do apiFetch