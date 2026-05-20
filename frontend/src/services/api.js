const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

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
