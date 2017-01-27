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

  var searchView;
  var foodListView;
  var foodCollection;

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
          var foodItem = new HTModels.FoodItem({
            name: food.food_name,
            calories: food.nf_calories,
            fat: food.nf_total_fat
          });

          foodCollection.add(foodItem);
          searchView.trigger('foodselected');
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
    },

    initialize: function() {
      this.search = this.$el.find('.search');
      this.foodChoices = this.$el.find('.food-choices');
      this.searchFoodCollection = new HTModels.SearchFoodCollection();

      this.on({
        'foodselected': this.clearSearch
      });
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
      var query = this.search.val().trim();

      self.searchFoodCollection.reset();

      if (!query) {
          return;
      }

      $.ajax('https://trackapi.nutritionix.com/v2/search/instant', {
        method: 'GET',
        data: {
          query: query,
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

    clearSearch: function() {
      this.search.val('');
      this.searchFoodCollection.reset();
      this.foodChoices.html('');
    }
  });

  /**
   * Represents the food list view.
   * @constructor
   * @memberof HealthTracker.Views~
   * @example
   * var foodListView = new FoodListView();
   */
  var FoodListView = Backbone.View.extend({
    el: '.food-list',

    initialize: function() {
      this.listenTo(foodCollection, 'add', this.render);
    },

    render: function(foodItem) {
      var foodListItemView = new FoodListItemView({ model: foodItem });
      this.$el.append(foodListItemView.render().el);
    }
  });

  /**
   * Represents the food list item view.
   * @constructor
   * @memberof HealthTracker.Views~
   * @example
   * var foodListItemView = new FoodListItemView();
   */
  var FoodListItemView = Backbone.View.extend({
    tagName: 'li',

    template: _.template(HTTemplates.foodListItem),

    events: {
      'click .food-list__remove': 'removeFoodItem'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    removeFoodItem: function() {
      foodCollection.remove(this.model);
      this.$el.remove();
    }
  });

  /**
   * Represents the food list view.
   * @constructor
   * @memberof HealthTracker.Views~
   * @example
   * var foodListView = new FoodListView();
   */
  var FoodListView = Backbone.View.extend({
    el: '.food-list',

    initialize: function() {
      this.listenTo(foodCollection, 'add', this.render);
    },

    render: function(foodItem) {
      var foodListItemHTML = _.template(HTTemplates.foodListItem);
      this.$el.append(foodListItemHTML(foodItem.attributes));
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
      this.totalCaloriesEl = this.$el.find('.total-calories');
      this.totalCalories = 0;

      foodCollection = new HTModels.FoodCollection();

      searchView = new SearchView();
      foodListView = new FoodListView();

      this.listenTo(foodCollection, 'add', this.addTotalCalories);
      this.listenTo(foodCollection, 'remove', this.subtractTotalCalories);

      this.render();
    },

    render: function() {
      this.totalCaloriesEl.html(this.totalCalories + ' cal');
    },

    addTotalCalories: function(foodItem) {
      this.totalCalories = this.totalCalories + foodItem.get('calories');
      this.totalCaloriesEl.html(this.totalCalories + ' cal');
    },

    subtractTotalCalories: function(foodItem) {
      this.totalCalories = this.totalCalories - foodItem.get('calories');
      this.totalCaloriesEl.html(this.totalCalories + ' cal');
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
