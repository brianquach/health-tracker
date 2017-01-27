var HealthTracker = HealthTracker || {};

/**
  * Encapsultes all views.
  * @namespace HealthTracker.Templates
  * @property {string}  HealthTracker.Templates.foodSearchDropDownOption
  *  Food search dropdown option HTML.
  */
HealthTracker.Templates = (function() {
  'use strict';

  return {
    /** Represents a food search dropdown option HTML template.
      * @memberof HealthTracker.Templates.
      */
    foodSearchDropDownOption: '<span><%= name %></span>',
    foodListItem: '<span><%= name %></span><span>cal: <%= calories %></span>' +
      '<button class="food-list__remove">remove</button>'
  }
})();
