/**
 * Normalize an Open Food Facts product into the standard food shape.
 */
function normalizeOFF(product) {
  const n = product.nutriments || {};
  return {
    name: product.product_name || 'Unknown',
    brand: product.brands || null,
    servingSize: product.serving_size || null,
    servingSizeG: n.serving_size ? parseFloat(n.serving_size) : null,
    calories: n['energy-kcal_100g'] ?? n['energy-kcal'] ?? null,
    protein: n.proteins_100g ?? n.proteins ?? null,
    fat: n.fat_100g ?? n.fat ?? null,
    saturatedFat: n['saturated-fat_100g'] ?? n['saturated-fat'] ?? null,
    carbs: n.carbohydrates_100g ?? n.carbohydrates ?? null,
    sugar: n.sugars_100g ?? n.sugars ?? null,
    fiber: n.fiber_100g ?? n.fiber ?? null,
    sodium: n.sodium_100g ?? n.sodium ?? null,
  };
}

/**
 * Normalize a CalorieNinjas item into the standard food shape.
 */
function normalizeCN(item) {
  return {
    name: item.name || 'Unknown',
    brand: null,
    servingSize: `${item.serving_size_g ?? 100}g`,
    servingSizeG: item.serving_size_g ?? 100,
    calories: item.calories ?? null,
    protein: item.protein_g ?? null,
    fat: item.fat_total_g ?? null,
    saturatedFat: item.fat_saturated_g ?? null,
    carbs: item.carbohydrates_total_g ?? null,
    sugar: item.sugar_g ?? null,
    fiber: item.fiber_g ?? null,
    sodium: item.sodium_mg ? item.sodium_mg / 1000 : null,
  };
}

module.exports = { normalizeOFF, normalizeCN };
