/**
 * Popular foods database for instant local suggestions.
 * Mix of Indian and international foods with approximate nutrition per serving.
 */

export const FOOD_CATEGORIES = [
  { id: 'recent', label: 'Recent', icon: '🕐' },
  { id: 'protein', label: 'Protein', icon: '🥩' },
  { id: 'grains', label: 'Grains', icon: '🌾' },
  { id: 'dairy', label: 'Dairy', icon: '🥛' },
  { id: 'fruits', label: 'Fruits', icon: '🍎' },
  { id: 'vegetables', label: 'Vegetables', icon: '🥬' },
  { id: 'snacks', label: 'Snacks', icon: '🍪' },
  { id: 'beverages', label: 'Beverages', icon: '☕' },
  { id: 'indian', label: 'Indian', icon: '🍛' },
];

const CATEGORY_COLORS = {
  protein: '#60a5fa',
  grains: '#fb923c',
  dairy: '#a78bfa',
  fruits: '#f472b6',
  vegetables: '#4ade80',
  snacks: '#fbbf24',
  beverages: '#38bdf8',
  indian: '#f97316',
};

export function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || '#8888a0';
}

export const POPULAR_FOODS = [
  // ─── Protein ───
  { name: 'Chicken Breast', category: 'protein', calories: 165, protein: 31, fat: 3.6, carbs: 0, servingSize: '100g', servingSizeG: 100, saturatedFat: 1, sugar: 0, fiber: 0, sodium: 0.07 },
  { name: 'Salmon', category: 'protein', calories: 208, protein: 20, fat: 13, carbs: 0, servingSize: '100g', servingSizeG: 100, saturatedFat: 3, sugar: 0, fiber: 0, sodium: 0.06 },
  { name: 'Eggs (whole)', category: 'protein', calories: 155, protein: 13, fat: 11, carbs: 1.1, servingSize: '2 eggs (100g)', servingSizeG: 100, saturatedFat: 3.3, sugar: 1.1, fiber: 0, sodium: 0.12 },
  { name: 'Egg Whites', category: 'protein', calories: 52, protein: 11, fat: 0.2, carbs: 0.7, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 0.7, fiber: 0, sodium: 0.17 },
  { name: 'Tuna (canned)', category: 'protein', calories: 132, protein: 28, fat: 1, carbs: 0, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.3, sugar: 0, fiber: 0, sodium: 0.33 },
  { name: 'Shrimp', category: 'protein', calories: 99, protein: 24, fat: 0.3, carbs: 0.2, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 0, fiber: 0, sodium: 0.11 },
  { name: 'Tofu', category: 'protein', calories: 76, protein: 8, fat: 4.8, carbs: 1.9, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.7, sugar: 0.6, fiber: 0.3, sodium: 0.01 },
  { name: 'Lentils (cooked)', category: 'protein', calories: 116, protein: 9, fat: 0.4, carbs: 20, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 1.8, fiber: 7.9, sodium: 0 },
  { name: 'Chickpeas (cooked)', category: 'protein', calories: 164, protein: 8.9, fat: 2.6, carbs: 27, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.3, sugar: 4.8, fiber: 7.6, sodium: 0.01 },
  { name: 'Protein Shake (whey)', category: 'protein', calories: 120, protein: 24, fat: 2, carbs: 3, servingSize: '1 scoop (30g)', servingSizeG: 30, saturatedFat: 1, sugar: 2, fiber: 0, sodium: 0.05 },

  // ─── Grains ───
  { name: 'White Rice (cooked)', category: 'grains', calories: 130, protein: 2.7, fat: 0.3, carbs: 28, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 0, fiber: 0.4, sodium: 0 },
  { name: 'Brown Rice (cooked)', category: 'grains', calories: 123, protein: 2.7, fat: 1, carbs: 26, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.2, sugar: 0.4, fiber: 1.8, sodium: 0 },
  { name: 'Oatmeal', category: 'grains', calories: 68, protein: 2.4, fat: 1.4, carbs: 12, servingSize: '100g (cooked)', servingSizeG: 100, saturatedFat: 0.2, sugar: 0.3, fiber: 1.7, sodium: 0 },
  { name: 'Pasta (cooked)', category: 'grains', calories: 158, protein: 5.8, fat: 0.9, carbs: 31, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.2, sugar: 0.6, fiber: 1.8, sodium: 0 },
  { name: 'Bread (whole wheat)', category: 'grains', calories: 247, protein: 13, fat: 3.4, carbs: 41, servingSize: '2 slices (100g)', servingSizeG: 100, saturatedFat: 0.6, sugar: 5.6, fiber: 7, sodium: 0.47 },
  { name: 'Bread (white)', category: 'grains', calories: 265, protein: 9, fat: 3.2, carbs: 49, servingSize: '2 slices (100g)', servingSizeG: 100, saturatedFat: 0.7, sugar: 5, fiber: 2.7, sodium: 0.49 },
  { name: 'Quinoa (cooked)', category: 'grains', calories: 120, protein: 4.4, fat: 1.9, carbs: 21, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.2, sugar: 0.9, fiber: 2.8, sodium: 0.01 },
  { name: 'Corn Tortilla', category: 'grains', calories: 218, protein: 5.7, fat: 2.8, carbs: 45, servingSize: '2 tortillas (100g)', servingSizeG: 100, saturatedFat: 0.4, sugar: 1.1, fiber: 6.3, sodium: 0.02 },

  // ─── Dairy ───
  { name: 'Milk (whole)', category: 'dairy', calories: 61, protein: 3.2, fat: 3.3, carbs: 4.8, servingSize: '100ml', servingSizeG: 100, saturatedFat: 1.9, sugar: 4.8, fiber: 0, sodium: 0.04 },
  { name: 'Milk (skim)', category: 'dairy', calories: 34, protein: 3.4, fat: 0.1, carbs: 5, servingSize: '100ml', servingSizeG: 100, saturatedFat: 0, sugar: 5, fiber: 0, sodium: 0.04 },
  { name: 'Greek Yogurt', category: 'dairy', calories: 59, protein: 10, fat: 0.7, carbs: 3.6, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 3.2, fiber: 0, sodium: 0.04 },
  { name: 'Cheddar Cheese', category: 'dairy', calories: 403, protein: 25, fat: 33, carbs: 1.3, servingSize: '100g', servingSizeG: 100, saturatedFat: 21, sugar: 0.5, fiber: 0, sodium: 0.62 },
  { name: 'Cottage Cheese', category: 'dairy', calories: 98, protein: 11, fat: 4.3, carbs: 3.4, servingSize: '100g', servingSizeG: 100, saturatedFat: 1.7, sugar: 2.7, fiber: 0, sodium: 0.36 },
  { name: 'Butter', category: 'dairy', calories: 717, protein: 0.9, fat: 81, carbs: 0.1, servingSize: '100g', servingSizeG: 100, saturatedFat: 51, sugar: 0.1, fiber: 0, sodium: 0.01 },

  // ─── Fruits ───
  { name: 'Banana', category: 'fruits', calories: 89, protein: 1.1, fat: 0.3, carbs: 23, servingSize: '1 medium (118g)', servingSizeG: 118, saturatedFat: 0.1, sugar: 12, fiber: 2.6, sodium: 0 },
  { name: 'Apple', category: 'fruits', calories: 52, protein: 0.3, fat: 0.2, carbs: 14, servingSize: '1 medium (182g)', servingSizeG: 182, saturatedFat: 0, sugar: 10, fiber: 2.4, sodium: 0 },
  { name: 'Orange', category: 'fruits', calories: 47, protein: 0.9, fat: 0.1, carbs: 12, servingSize: '1 medium (131g)', servingSizeG: 131, saturatedFat: 0, sugar: 9.4, fiber: 2.4, sodium: 0 },
  { name: 'Mango', category: 'fruits', calories: 60, protein: 0.8, fat: 0.4, carbs: 15, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 14, fiber: 1.6, sodium: 0 },
  { name: 'Grapes', category: 'fruits', calories: 69, protein: 0.7, fat: 0.2, carbs: 18, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 15, fiber: 0.9, sodium: 0 },
  { name: 'Watermelon', category: 'fruits', calories: 30, protein: 0.6, fat: 0.2, carbs: 8, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 6.2, fiber: 0.4, sodium: 0 },
  { name: 'Papaya', category: 'fruits', calories: 43, protein: 0.5, fat: 0.3, carbs: 11, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 8, fiber: 1.7, sodium: 0 },
  { name: 'Pomegranate', category: 'fruits', calories: 83, protein: 1.7, fat: 1.2, carbs: 19, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 14, fiber: 4, sodium: 0 },
  { name: 'Guava', category: 'fruits', calories: 68, protein: 2.6, fat: 1, carbs: 14, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.3, sugar: 8.9, fiber: 5.4, sodium: 0 },
  { name: 'Strawberries', category: 'fruits', calories: 32, protein: 0.7, fat: 0.3, carbs: 7.7, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 4.9, fiber: 2, sodium: 0 },
  { name: 'Blueberries', category: 'fruits', calories: 57, protein: 0.7, fat: 0.3, carbs: 14, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 10, fiber: 2.4, sodium: 0 },

  // ─── Vegetables ───
  { name: 'Broccoli', category: 'vegetables', calories: 34, protein: 2.8, fat: 0.4, carbs: 7, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 1.7, fiber: 2.6, sodium: 0.03 },
  { name: 'Spinach (cooked)', category: 'vegetables', calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 0.4, fiber: 2.2, sodium: 0.07 },
  { name: 'Sweet Potato', category: 'vegetables', calories: 86, protein: 1.6, fat: 0.1, carbs: 20, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 4.2, fiber: 3, sodium: 0.04 },
  { name: 'Potato (boiled)', category: 'vegetables', calories: 87, protein: 1.9, fat: 0.1, carbs: 20, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 0.8, fiber: 1.8, sodium: 0 },
  { name: 'Carrot', category: 'vegetables', calories: 41, protein: 0.9, fat: 0.2, carbs: 10, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 4.7, fiber: 2.8, sodium: 0.07 },
  { name: 'Tomato', category: 'vegetables', calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 2.6, fiber: 1.2, sodium: 0.01 },
  { name: 'Cucumber', category: 'vegetables', calories: 15, protein: 0.7, fat: 0.1, carbs: 3.6, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 1.7, fiber: 0.5, sodium: 0 },
  { name: 'Avocado', category: 'vegetables', calories: 160, protein: 2, fat: 15, carbs: 9, servingSize: '100g', servingSizeG: 100, saturatedFat: 2.1, sugar: 0.7, fiber: 6.7, sodium: 0.01 },
  { name: 'Mushrooms', category: 'vegetables', calories: 22, protein: 3.1, fat: 0.3, carbs: 3.3, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 2, fiber: 1, sodium: 0.01 },
  { name: 'Onion', category: 'vegetables', calories: 40, protein: 1.1, fat: 0.1, carbs: 9.3, servingSize: '100g', servingSizeG: 100, saturatedFat: 0, sugar: 4.2, fiber: 1.7, sodium: 0 },

  // ─── Snacks & Nuts ───
  { name: 'Almonds', category: 'snacks', calories: 579, protein: 21, fat: 50, carbs: 22, servingSize: '100g', servingSizeG: 100, saturatedFat: 3.8, sugar: 4.4, fiber: 12, sodium: 0 },
  { name: 'Peanut Butter', category: 'snacks', calories: 588, protein: 25, fat: 50, carbs: 20, servingSize: '2 tbsp (32g)', servingSizeG: 32, saturatedFat: 10, sugar: 6.6, fiber: 6, sodium: 0.46 },
  { name: 'Mixed Nuts', category: 'snacks', calories: 607, protein: 20, fat: 54, carbs: 21, servingSize: '100g', servingSizeG: 100, saturatedFat: 7, sugar: 4, fiber: 7, sodium: 0 },
  { name: 'Dark Chocolate', category: 'snacks', calories: 546, protein: 5, fat: 31, carbs: 60, servingSize: '100g', servingSizeG: 100, saturatedFat: 19, sugar: 48, fiber: 7, sodium: 0.02 },
  { name: 'Granola Bar', category: 'snacks', calories: 190, protein: 3, fat: 7, carbs: 29, servingSize: '1 bar (42g)', servingSizeG: 42, saturatedFat: 1, sugar: 12, fiber: 2, sodium: 0.12 },
  { name: 'Trail Mix', category: 'snacks', calories: 462, protein: 14, fat: 30, carbs: 40, servingSize: '100g', servingSizeG: 100, saturatedFat: 5, sugar: 26, fiber: 4, sodium: 0.07 },
  { name: 'Popcorn (plain)', category: 'snacks', calories: 375, protein: 11, fat: 4.3, carbs: 74, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.6, sugar: 0.9, fiber: 15, sodium: 0.01 },

  // ─── Beverages ───
  { name: 'Coffee (black)', category: 'beverages', calories: 2, protein: 0.3, fat: 0, carbs: 0, servingSize: '1 cup (240ml)', servingSizeG: 240, saturatedFat: 0, sugar: 0, fiber: 0, sodium: 0 },
  { name: 'Green Tea', category: 'beverages', calories: 1, protein: 0, fat: 0, carbs: 0, servingSize: '1 cup (240ml)', servingSizeG: 240, saturatedFat: 0, sugar: 0, fiber: 0, sodium: 0 },
  { name: 'Orange Juice', category: 'beverages', calories: 45, protein: 0.7, fat: 0.2, carbs: 10, servingSize: '1 glass (200ml)', servingSizeG: 200, saturatedFat: 0, sugar: 8.4, fiber: 0.2, sodium: 0 },
  { name: 'Coconut Water', category: 'beverages', calories: 19, protein: 0.7, fat: 0.2, carbs: 3.7, servingSize: '100ml', servingSizeG: 100, saturatedFat: 0.2, sugar: 2.6, fiber: 1.1, sodium: 0.11 },
  { name: 'Protein Smoothie', category: 'beverages', calories: 180, protein: 20, fat: 4, carbs: 18, servingSize: '1 glass (300ml)', servingSizeG: 300, saturatedFat: 1, sugar: 12, fiber: 2, sodium: 0.05 },

  // ─── Indian Foods ───
  { name: 'Roti / Chapati', category: 'indian', calories: 104, protein: 3.1, fat: 3.7, carbs: 15, servingSize: '1 roti (40g)', servingSizeG: 40, saturatedFat: 0.6, sugar: 0.4, fiber: 1.9, sodium: 0.01 },
  { name: 'Naan', category: 'indian', calories: 262, protein: 9, fat: 5, carbs: 46, servingSize: '1 naan (90g)', servingSizeG: 90, saturatedFat: 1.6, sugar: 3.3, fiber: 2, sodium: 0.48 },
  { name: 'Paratha', category: 'indian', calories: 260, protein: 5, fat: 13, carbs: 32, servingSize: '1 paratha (80g)', servingSizeG: 80, saturatedFat: 4, sugar: 1, fiber: 2, sodium: 0.02 },
  { name: 'Puri', category: 'indian', calories: 101, protein: 1.7, fat: 5.4, carbs: 12, servingSize: '1 puri (25g)', servingSizeG: 25, saturatedFat: 0.7, sugar: 0.3, fiber: 0.7, sodium: 0.01 },
  { name: 'Basmati Rice (cooked)', category: 'indian', calories: 121, protein: 3.5, fat: 0.4, carbs: 25, servingSize: '100g', servingSizeG: 100, saturatedFat: 0.1, sugar: 0.1, fiber: 0.4, sodium: 0 },
  { name: 'Dal (Toor)', category: 'indian', calories: 128, protein: 6.6, fat: 1.2, carbs: 22, servingSize: '1 bowl (150g)', servingSizeG: 150, saturatedFat: 0.2, sugar: 3, fiber: 5, sodium: 0.02 },
  { name: 'Dal Makhani', category: 'indian', calories: 180, protein: 8, fat: 8, carbs: 20, servingSize: '1 bowl (150g)', servingSizeG: 150, saturatedFat: 3, sugar: 2, fiber: 4, sodium: 0.05 },
  { name: 'Moong Dal', category: 'indian', calories: 105, protein: 7.5, fat: 0.5, carbs: 18, servingSize: '1 bowl (150g)', servingSizeG: 150, saturatedFat: 0.1, sugar: 2, fiber: 4.5, sodium: 0.01 },
  { name: 'Paneer', category: 'indian', calories: 265, protein: 18, fat: 21, carbs: 1.2, servingSize: '100g', servingSizeG: 100, saturatedFat: 13, sugar: 0.5, fiber: 0, sodium: 0.02 },
  { name: 'Palak Paneer', category: 'indian', calories: 170, protein: 10, fat: 12, carbs: 6, servingSize: '1 serving (150g)', servingSizeG: 150, saturatedFat: 6, sugar: 2, fiber: 2, sodium: 0.06 },
  { name: 'Butter Chicken', category: 'indian', calories: 240, protein: 18, fat: 15, carbs: 9, servingSize: '1 serving (200g)', servingSizeG: 200, saturatedFat: 6, sugar: 3, fiber: 1, sodium: 0.08 },
  { name: 'Chicken Biryani', category: 'indian', calories: 290, protein: 15, fat: 10, carbs: 35, servingSize: '1 plate (250g)', servingSizeG: 250, saturatedFat: 3, sugar: 2, fiber: 2, sodium: 0.07 },
  { name: 'Chole (Chana Masala)', category: 'indian', calories: 180, protein: 9, fat: 6, carbs: 24, servingSize: '1 bowl (150g)', servingSizeG: 150, saturatedFat: 0.5, sugar: 4, fiber: 7, sodium: 0.05 },
  { name: 'Rajma', category: 'indian', calories: 165, protein: 9, fat: 4, carbs: 24, servingSize: '1 bowl (150g)', servingSizeG: 150, saturatedFat: 0.5, sugar: 2, fiber: 6, sodium: 0.04 },
  { name: 'Idli', category: 'indian', calories: 58, protein: 2, fat: 0.4, carbs: 12, servingSize: '1 idli (40g)', servingSizeG: 40, saturatedFat: 0.1, sugar: 0.5, fiber: 0.8, sodium: 0.01 },
  { name: 'Dosa (plain)', category: 'indian', calories: 133, protein: 3.9, fat: 3.7, carbs: 21, servingSize: '1 dosa (80g)', servingSizeG: 80, saturatedFat: 0.5, sugar: 1, fiber: 1.5, sodium: 0.02 },
  { name: 'Masala Dosa', category: 'indian', calories: 206, protein: 5, fat: 7, carbs: 30, servingSize: '1 dosa (120g)', servingSizeG: 120, saturatedFat: 1.5, sugar: 2, fiber: 2, sodium: 0.03 },
  { name: 'Sambar', category: 'indian', calories: 65, protein: 3.5, fat: 1.5, carbs: 10, servingSize: '1 bowl (150g)', servingSizeG: 150, saturatedFat: 0.3, sugar: 3, fiber: 3, sodium: 0.04 },
  { name: 'Poha', category: 'indian', calories: 160, protein: 3, fat: 5, carbs: 27, servingSize: '1 plate (150g)', servingSizeG: 150, saturatedFat: 0.5, sugar: 2, fiber: 1, sodium: 0.02 },
  { name: 'Upma', category: 'indian', calories: 170, protein: 4, fat: 5, carbs: 28, servingSize: '1 plate (150g)', servingSizeG: 150, saturatedFat: 1, sugar: 1, fiber: 2, sodium: 0.03 },
  { name: 'Aloo Paratha', category: 'indian', calories: 300, protein: 6, fat: 14, carbs: 38, servingSize: '1 paratha (100g)', servingSizeG: 100, saturatedFat: 5, sugar: 2, fiber: 3, sodium: 0.03 },
  { name: 'Raita', category: 'indian', calories: 55, protein: 2.5, fat: 2, carbs: 7, servingSize: '1 bowl (100g)', servingSizeG: 100, saturatedFat: 1.2, sugar: 5, fiber: 0.5, sodium: 0.03 },
  { name: 'Sweet Lassi', category: 'indian', calories: 160, protein: 5, fat: 4, carbs: 26, servingSize: '1 glass (200ml)', servingSizeG: 200, saturatedFat: 2.5, sugar: 22, fiber: 0, sodium: 0.05 },
  { name: 'Chai (with milk)', category: 'indian', calories: 70, protein: 2, fat: 2.5, carbs: 10, servingSize: '1 cup (150ml)', servingSizeG: 150, saturatedFat: 1.5, sugar: 8, fiber: 0, sodium: 0.03 },
  { name: 'Khichdi', category: 'indian', calories: 150, protein: 5, fat: 4, carbs: 24, servingSize: '1 bowl (200g)', servingSizeG: 200, saturatedFat: 1, sugar: 1, fiber: 2, sodium: 0.02 },
  { name: 'Uttapam', category: 'indian', calories: 175, protein: 5, fat: 4.5, carbs: 28, servingSize: '1 uttapam (120g)', servingSizeG: 120, saturatedFat: 0.8, sugar: 2, fiber: 2, sodium: 0.02 },
  { name: 'Vada', category: 'indian', calories: 160, protein: 4, fat: 10, carbs: 14, servingSize: '2 vadas (80g)', servingSizeG: 80, saturatedFat: 1.5, sugar: 1, fiber: 2, sodium: 0.02 },
];

/**
 * Search popular foods by name query.
 * Returns matching foods sorted by relevance.
 */
export function searchPopularFoods(query) {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/);

  const scored = POPULAR_FOODS
    .map((food) => {
      const name = food.name.toLowerCase();
      let score = 0;

      // Exact match
      if (name === q) score += 100;
      // Starts with query
      else if (name.startsWith(q)) score += 80;
      // Contains full query
      else if (name.includes(q)) score += 60;
      // All words match
      else if (words.every((w) => name.includes(w))) score += 40;
      // Some words match
      else {
        const matchCount = words.filter((w) => name.includes(w)).length;
        if (matchCount > 0) score += matchCount * 15;
      }

      // Category match bonus
      if (food.category && food.category.includes(q)) score += 10;

      return { ...food, _score: score };
    })
    .filter((f) => f._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 12);

  // Clean up score property
  return scored.map(({ _score, ...food }) => food);
}

/**
 * Get popular foods by category.
 */
export function getFoodsByCategory(categoryId) {
  return POPULAR_FOODS.filter((f) => f.category === categoryId);
}
