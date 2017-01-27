var HealthTracker = HealthTracker || {};

/**
  * Encapsultes all the models.
  * @namespace HealthTracker.Models
  */
HealthTracker.Models = (function() {
  'use strict';

  /**
   * Represents a food item.
   * @constructor
   * @memberof HealthTracker.Models~
   * @param {string} name - The name of the food.
   * @param {number} calories - The number of calories contained in the food.
   * @param {number} name - The amount of fat (grams) in the food.
   * @example
   * var foodItem = new FoodTime({ name: 'Chicken', calories: 300, fat: 2 });
   */
  var FoodItem = Backbone.Model.extend({
    default: {
      name: '',
      calories: 0,
      fat: 0
    }
  });
  
  return {
    FoodItem: FoodItem
  };
})();
