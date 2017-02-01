/**
 * Application view logic.
 * Author: Brian Quach
 */

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
  var HTCollections = HealthTracker.Collections;

  var searchView;
  var foodListView;
  var foodCollection;

  /**
   * Represents the food search view.
   * @constructor
   * @memberof HealthTracker.Views~
   * @example
   * var searchView = new SearchView();
   */
  var SearchView = Backbone.View.extend({
    el: '.js-food-search',

    events: {
      'keydown .js-search': 'searchFoods',
    },

    initialize: function() {
      this.search = this.$el.find('.js-search');
      this.foodChoices = this.$el.find('.js-food-choices');
      this.searchFoodCollection = new HTCollections.SearchFoodCollection();
      this.searchErrorMsg = this.$el.find('.js-search-error').hide();
      this.itemSearchErrorMsg = this.$el.find('.js-item-search-error').hide();
      this.noResultsMsg = this.$el.find('.js-no-results').hide();
      this.loading = this.$el.find('.js-loading').hide();

      this.on({
        'foodselected': this.clearSearch,
        'itemsearcherror': this.itemSearchError,
        'itemStartloading': this.itemStartLoading,
        'itemStoploading': this.itemStopLoading,
      });
    },

    render: function() {
      var foodItem;
      var self = this;
      self.foodChoices.html('');
      this.searchFoodCollection.each(function(f) {
        foodItem = new SearchItemView({ model: f });
        self.foodChoices.append(foodItem.render().el);
      });
    },

    searchFoods: _.debounce(function(e) {
      var self = this;
      var query = this.search.val().trim();

      this.searchFoodCollection.reset();
      this.noResultsMsg.hide();

      if (!query) {
        this.clearSearch();
        return;
      }

      this.loading.show();

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
            name: f.food_name,
            thumbnailURL: f.photo.thumb
          });
          self.searchFoodCollection.add(foodItem);
        });

        if (foodItems.length < 1) {
          self.noResultsMsg.show();
        }

        self.render();
      }).fail(function() {
        self.searchErrorMsg.show();
        self.render();
      }).always(function() {
        self.loading.hide();
      });
    }, 400),

    clearSearch: function() {
      this.search.val('');
      this.searchFoodCollection.reset();
      this.foodChoices.html('');
    },

    itemSearchError: function() {
      this.itemSearchErrorMsg.show();
      this.clearSearch();
    },

    itemStartLoading: function() {
      this.loading.show();
    },

    itemStopLoading: function() {
      this.loading.hide();
    }
  });

  /**
   * Represents the food search dropdown option view.
   * @constructor
   * @memberof HealthTracker.Views~
   * @param {object} model - The FoodItem Model.
   * @example
   * var searchItemView = new SearchItemView({ model: new FoodItem() });
   */
  var SearchItemView = Backbone.View.extend({
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

        searchView.trigger('itemStartloading');

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
            calories: Math.round(food.nf_calories),
            fat: Math.round(food.nf_total_fat),
            thumbnailURL: food.photo.thumb
          });

          foodCollection.add(foodItem);
          foodCollection.saveToLocalStorage();
          searchView.trigger('foodselected');
        }).fail(function() {
          searchView.trigger('itemsearcherror');
        }).always(function() {
          searchView.trigger('itemStoploading');
        });
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
    el: '.js-food-list',

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
      foodCollection.saveToLocalStorage();
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
      this.totalCaloriesEl = this.$el.find('.js-total-calories');
      this.totalFatEl = this.$el.find('.js-total-fat');
      this.totalCalories = 0;
      this.totalFat = 0;

      foodCollection = new HTCollections.FoodCollection();

      searchView = new SearchView();
      foodListView = new FoodListView();

      this.listenTo(foodCollection, 'add', this.addStats);
      this.listenTo(foodCollection, 'remove', this.subtractStats);

      var storedState = localStorage.getItem('healthTrackerFoodList');
      if (storedState) {
        this.loadState(storedState);
      }

      this.render();
    },

    render: function() {
      this.totalCaloriesEl.html(this.totalCalories + ' cal');
      this.totalFatEl.html(this.totalFat + ' g');
    },

    addStats: function(foodItem) {
      this.totalCalories += foodItem.get('calories');
      this.totalCaloriesEl.html(this.totalCalories + ' cal');
      this.totalFat += foodItem.get('fat');
      this.totalFatEl.html(this.totalFat + ' g');
    },

    subtractStats: function(foodItem) {
      this.totalCalories -= foodItem.get('calories');
      this.totalCaloriesEl.html(this.totalCalories + ' cal');
      this.totalFat -= foodItem.get('fat');
      this.totalFatEl.html(this.totalFat + ' g');
    },

    loadState: function(state) {
      var foodItems = JSON.parse(state);
      var foodItem;
      _.forEach(foodItems, function(fi) {
        foodItem = new HTModels.FoodItem({
          name: fi.name,
          calories: fi.calories,
          fat: fi.fat,
          thumbnailURL: fi.thumbnailURL
        });
        foodCollection.add(foodItem);
      });
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
