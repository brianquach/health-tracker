/**
 * Application collections logic.
 * Author: Brian Quach
 */

var HealthTracker = HealthTracker || {};

/**
  * Encapsultes all the collections.
  * @namespace HealthTracker.Collections
  */
HealthTracker.Collections = (function() {
  'use strict';

  var HTModels = HealthTracker.Models;

  /**
   * Represents a collection of FoodItems.
   * @constructor
   * @memberof HealthTracker.Collections~
   */
  var FoodCollection = Backbone.Collection.extend({
    model: HTModels.FoodItem,

    saveToLocalStorage: function() {
      var foodListSave = JSON.stringify(this.models);
      localStorage.setItem('healthTrackerFoodList', foodListSave);
    }
  });

  /**
   * Represents a collection of FoodItems.
   * @constructor
   * @memberof HealthTracker.Collections~
   */
  var SearchFoodCollection = Backbone.Collection.extend({
    model: HTModels.FoodItem
  });

  return {
    FoodCollection: FoodCollection,
    SearchFoodCollection: SearchFoodCollection
  };
})();
