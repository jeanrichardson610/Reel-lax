// src/utils/cache.js
const cache = {};

export const fetchWithCache = async (url, retries = 3, delay = 1000) => {
  if (cache[url]) return cache[url];

  try {
    const res = await fetch(url);

    if (res.status === 429 && retries > 0) {
      // Wait and retry
      await new Promise((r) => setTimeout(r, delay));
      return fetchWithCache(url, retries - 1, delay * 2); // exponential backoff
    }

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data = await res.json();
    cache[url] = data;
    return data;
  } catch (err) {
    throw err;
  }
};
