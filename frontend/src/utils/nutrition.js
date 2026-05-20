/**
 * Calculate totals for a day's meals.
 * @param {Object} meals - { breakfast: [...], lunch: [...], dinner: [...], snacks: [...] }
 * @returns {Object} Totals: { calories, protein, fat, saturatedFat, carbs, sugar, fiber, sodium }
 */
export function calculateDayTotals(meals) {
  const totals = {
    calories: 0,
    protein: 0,
    fat: 0,
    saturatedFat: 0,
    carbs: 0,
    sugar: 0,
    fiber: 0,
    sodium: 0,
  };

  if (!meals) return totals;

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];

  mealTypes.forEach((mealType) => {
    const foods = meals[mealType];
    if (!Array.isArray(foods)) return;

    foods.forEach((food) => {
      const qty = food.quantity || 1;
      totals.calories += (food.calories || 0) * qty;
      totals.protein += (food.protein || 0) * qty;
      totals.fat += (food.fat || 0) * qty;
      totals.saturatedFat += (food.saturatedFat || 0) * qty;
      totals.carbs += (food.carbs || 0) * qty;
      totals.sugar += (food.sugar || 0) * qty;
      totals.fiber += (food.fiber || 0) * qty;
      totals.sodium += (food.sodium || 0) * qty;
    });
  });

  // Round all values
  Object.keys(totals).forEach((key) => {
    totals[key] = Math.round(totals[key] * 10) / 10;
  });

  return totals;
}

/**
 * Calculate meal-specific totals.
 * @param {Array} foods - Array of food items
 * @returns {Object} Totals for that meal
 */
export function calculateMealTotals(foods) {
  const totals = { calories: 0, protein: 0, fat: 0, carbs: 0 };

  if (!Array.isArray(foods)) return totals;

  foods.forEach((food) => {
    const qty = food.quantity || 1;
    totals.calories += (food.calories || 0) * qty;
    totals.protein += (food.protein || 0) * qty;
    totals.fat += (food.fat || 0) * qty;
    totals.carbs += (food.carbs || 0) * qty;
  });

  Object.keys(totals).forEach((key) => {
    totals[key] = Math.round(totals[key] * 10) / 10;
  });

  return totals;
}

/**
 * Get percentage of goal consumed.
 * @param {number} consumed
 * @param {number} goal
 * @returns {number} Percentage (0-∞)
 */
export function getGoalPercentage(consumed, goal) {
  if (!goal || goal <= 0) return 0;
  return Math.round((consumed / goal) * 100);
}

/**
 * Format a date string "YYYY-MM-DD" to a human-readable format.
 * @param {string} dateStr - e.g. "2026-05-20"
 * @returns {string} e.g. "May 20, 2026"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format date to day of week.
 * @param {string} dateStr - e.g. "2026-05-20"
 * @returns {string} e.g. "Wednesday"
 */
export function formatDayOfWeek(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

/**
 * Get a YYYY-MM-DD string from a Date object.
 * @param {Date} date
 * @returns {string}
 */
export function getDateKey(date) {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get today's date key.
 * @returns {string} e.g. "2026-05-20"
 */
export function getTodayKey() {
  return getDateKey(new Date());
}

/**
 * Generate a unique ID.
 * @returns {string}
 */
export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Navigate to a date relative to the given date string.
 * @param {string} dateStr - Current date key
 * @param {number} offset - Number of days to offset (+/-)
 * @returns {string} New date key
 */
export function offsetDate(dateStr, offset) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + offset);
  return getDateKey(date);
}

/**
 * Check if a date string is today.
 * @param {string} dateStr
 * @returns {boolean}
 */
export function isToday(dateStr) {
  return dateStr === getTodayKey();
}
