var HealthTracker = HealthTracker || {};

HealthTracker.Models = (function() {
  'use strict';

  var FoodItem = Backbone.Model.extend({
    default: {
      name: '',
      calories: 0,
      fat: 0
    }
  });

  var FoodCollection = Backbone.Collection.extend({
    model: FoodItem
  });

  var SearchFoodCollection = Backbone.Collection.extend({
    model: FoodItem
  });

  return {
    FoodItem: FoodItem,
    FoodCollection: FoodCollection,
    SearchFoodCollection: SearchFoodCollection
  };
})();
