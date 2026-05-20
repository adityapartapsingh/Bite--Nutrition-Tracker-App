const { normalizeOFF, normalizeCN } = require('../utils/normalizers');
const { calorieNinjasApiKey } = require('../config');

exports.lookupBarcode = async (req, res, next) => {
  try {
    const { barcode } = req.params;
    const url =
      `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}` +
      `?fields=product_name,brands,nutriments,serving_size,image_url`;

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Bite-NutritionTracker/1.0' },
    });
    const data = await response.json();

    if (!data || data.status === 0 || !data.product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    return res.json({ success: true, food: normalizeOFF(data.product) });
  } catch (err) {
    next(err);
  }
};

exports.searchFood = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ success: false, error: "Missing 'query' parameter" });
    }

    if (!calorieNinjasApiKey || calorieNinjasApiKey === 'your_key_here') {
      return res.status(500).json({ success: false, error: 'CALORIENINJAS_API_KEY is not configured' });
    }

    const url = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: { 'X-Api-Key': calorieNinjasApiKey },
    });

    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: 'CalorieNinjas API error' });
    }

    const data = await response.json();
    const foods = (data.items || []).map(normalizeCN);

    return res.json({ success: true, foods });
  } catch (err) {
    next(err);
  }
};
