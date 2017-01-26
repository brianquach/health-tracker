/**
  * Health Tracker namespace.
  * @namespace HealthTracker
  */
var HealthTracker = HealthTracker || {};

/**
  * Encapsultes all views.
  * @namespace HealthTracker.Views
  * @property {object} nutritionixHeader Holds API ID and KEY for access to
  *   Nutritionx API.
  * @property {object} HTModels alias for HealthTracker.Models namespace.
  * @property {object} HTTemplates alias for HealthTracker.Templates namespace.
  */
HealthTracker.Views = (function() {
  'use strict';

  var nutritionixHeader = {
    "x-app-id": 'fff9731b',
    "x-app-key": 'a9c550a6a475c562adf3ecfa44ec748a'
  };
  var HTModels = HealthTracker.Models;
  var HTTemplates = HealthTracker.Templates;

  /**
   * Represents the food search dropdown option view.
   * @constructor
   * @memberof HealthTracker.Views~
   * @param {object} model - The FoodItem Model.
   * @example
   * var foodSearchItemView = new FoodSearchItemView({ model: new FoodItem() });
   */
  var FoodSearchItemView = Backbone.View.extend({
      tagName: 'li',

      events: {
        'click': 'select'
      },

      template: _.template(HTTemplates.foodSearchDropDownOption),

      initialize: function() {
        this.foodCollection = new FoodCollection();
      },

      render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
      },

      select: function() {
        var query = this.model.get('name');

        $.ajax('https://trackapi.nutritionix.com/v2/natural/nutrients/', {
          method: 'POST',
          data: {
            query: query,
            num_servings: 1,
          },
          headers: nutritionixHeader
        }).done(function(resp) {
          var food = resp.foods[0];
          var foodItem = new FoodItem({
            name: food.food_name,
            calories: food.nf_calories,
            fat: food.nf_total_fat
          });
          this.foodCollection.add(foodItem);
        }).fail(function() {
          // TODO: handle error when API cannot connect
        });
      }
  });

  /**
   * Represents the food search view.
   * @constructor
   * @memberof HealthTracker.Views~
   * @example
   * var searchView = new SearchView();
   */
  var SearchView = Backbone.View.extend({
    el: '.food-search',

    events: {
      'keydown .search': 'searchFoods',
      'foodselected': 'foodSelected'
    },

    initialize: function() {
      this.search = this.$el.find('.search');
      this.foodChoices = this.$el.find('.food-choices');
      this.searchFoodCollection = new HTModels.SearchFoodCollection();
      console.log('search view init');
    },

    render: function() {
      var foodItem;
      var self = this;
      self.foodChoices.html('');
      this.searchFoodCollection.each(function(f) {
        foodItem = new FoodSearchItemView({ model: f });
        self.foodChoices.append(foodItem.render().el);
      });
    },
    
    searchFoods: _.debounce(function(e) {
      var self = this;

      self.searchFoodCollection.reset();

      $.ajax('https://trackapi.nutritionix.com/v2/search/instant', {
        method: 'GET',
        data: {
          query: this.search.val(),
          self: false,
          branded: false
        },
        headers: nutritionixHeader
      }).done(function(resp) {
        var foodItem;
        var foodItems = resp.common;
        _.forEach(foodItems, function(f) {
          foodItem = new HTModels.FoodItem({
            name: f.food_name
          });
          self.searchFoodCollection.add(foodItem);
        });
        self.render();
      }).fail(function() {
        self.render();
        // TODO: handle error when API cannot connect
      });
    }, 400),

    foodSelected: function() {
      self.searchFoodCollection.reset();
      self.foodChoices.html('');
    }
  });

  /**
   * Represents the Health Tracker app view.
   * @constructor
   * @memberof HealthTracker.Views
   * @property {object} el View element.
   * @example
   * var app = new App();
   */
  var App = Backbone.View.extend({
    el: '#health-tracker',

    initialize: function() {
      this.totalCalories = this.$el.find('.total-calories');
      this.searchView = new SearchView();

      this.render();
      console.log('app init');
    },

    render: function() {
      this.totalCalories.html('0 cal');
      console.log('app render');
    }
  });

  /**
   * Initializes the Health Tracker application.
   * @function
   * @memberof HealthTracker.Views~
   */
  var init = function() {
      var app = new App();
  };

  return {
    init: init
  };
})();

HealthTracker.Views.init();
