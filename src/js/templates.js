var HealthTracker = HealthTracker || {};

/**
  * Encapsultes all views.
  * @namespace HealthTracker.Templates
  * @property {string}  HealthTracker.Templates.foodSearchDropDownOption
  *  Food search dropdown option HTML.
  * @property {string}  HealthTracker.Templates.foodListItem
  *  Food list item HTML.
  */
HealthTracker.Templates = (function() {
  'use strict';

  return {
    /** Represents a food search dropdown option HTML template.
      * @memberof HealthTracker.Templates.
      */
    foodSearchDropDownOption: '<span><%= name %></span>',
    /** Represents a food item HTML template.
      * @memberof HealthTracker.Templates.
      */
    foodListItem: '<span><%= name %></span><span>cal: <%= calories %></span>' +
      '<button class="food-list__remove">remove</button>'
  }
})();
