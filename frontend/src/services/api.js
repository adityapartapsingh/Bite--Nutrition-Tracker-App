// Support both URLs in a single `.env`: REACT_APP_API_URL (override),
// REACT_APP_API_URL_PROD and REACT_APP_API_URL_DEV.
const PROD_API_FALLBACK = process.env.REACT_APP_API_URL_PROD || 'https://bite-nutrition-tracker.onrender.com';
const DEV_API_FALLBACK = process.env.REACT_APP_API_URL_DEV || 'http://localhost:3001';
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? PROD_API_FALLBACK : DEV_API_FALLBACK);

/**
 * Search for foods by name/keyword.
 * @param {string} query - Search term
 * @returns {Promise<Array>} Array of food objects
 */
export async function searchFood(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const res = await fetch(
    `${API_BASE}/api/search?query=${encodeURIComponent(query.trim())}`
  );

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Search failed');
    throw new Error(errorText || 'Search failed');
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error || 'No results found');
  }

  return data.foods || [];
}

/**
 * Look up a food product by barcode.
 * @param {string} barcode - UPC/EAN barcode string
 * @returns {Promise<Object>} Food object
 */
export async function lookupBarcode(barcode) {
  if (!barcode || barcode.trim().length === 0) {
    throw new Error('Barcode is required');
  }

  const res = await fetch(
    `${API_BASE}/api/barcode/${encodeURIComponent(barcode.trim())}`
  );

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Barcode lookup failed');
    throw new Error(errorText || 'Barcode lookup failed');
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error || 'Product not found');
  }

  return data.food;
}
