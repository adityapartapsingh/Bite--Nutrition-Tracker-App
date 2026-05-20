module.exports = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'bite-nutrition-secret-change-in-production',
  jwtExpiry: '7d',
  calorieNinjasApiKey: process.env.CALORIENINJAS_API_KEY,
};
