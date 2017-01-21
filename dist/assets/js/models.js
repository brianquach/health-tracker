var HealthTracker = HealthTracker || {};

(function() {
  'use strict'

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
  console.log('models');
})();
