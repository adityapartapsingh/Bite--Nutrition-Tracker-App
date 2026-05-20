import React from 'react';
import './NutritionInsight.css';

function NutritionInsight({ macros, goal }) {
  const getInsight = () => {
    if (!macros || !goal) return null;

    const proteinProgress = (macros.protein / goal.protein) * 100;
    const carbProgress = (macros.carbs / goal.carbs) * 100;
    const fatProgress = (macros.fat / goal.fat) * 100;

    if (proteinProgress < 50 && carbProgress > 80) {
      return {
        type: 'warning',
        icon: '⚖️',
        title: 'Macro Imbalance',
        message: 'Your carb intake is high while protein is low. Try adding a protein source like chicken or lentils.'
      };
    }
    
    if (proteinProgress >= 90 && proteinProgress <= 110) {
      return {
        type: 'success',
        icon: '💪',
        title: 'Great Protein Intake',
        message: 'You are hitting your protein goals perfectly! This helps with muscle recovery.'
      };
    }

    if (macros.calories > goal.calories * 0.9 && proteinProgress < 70) {
      return {
        type: 'warning',
        icon: '⚠️',
        title: 'Low Protein',
        message: 'You are close to your calorie limit but low on protein. Focus on lean proteins for your next meal.'
      };
    }

    if (macros.calories < goal.calories * 0.3) {
      return {
        type: 'info',
        icon: '🌅',
        title: 'Start Strong',
        message: 'A high-protein breakfast can keep you full longer and reduce cravings.'
      };
    }

    return {
      type: 'info',
      icon: '✨',
      title: 'On Track',
      message: 'Keep logging your meals to get personalized nutrition insights.'
    };
  };

  const insight = getInsight();

  if (!insight) return null;

  return (
    <div className={`nutrition-insight nutrition-insight--${insight.type} fade-in`}>
      <div className="nutrition-insight__icon">{insight.icon}</div>
      <div className="nutrition-insight__content">
        <h4 className="nutrition-insight__title">{insight.title}</h4>
        <p className="nutrition-insight__message">{insight.message}</p>
      </div>
    </div>
  );
}

export default NutritionInsight;
