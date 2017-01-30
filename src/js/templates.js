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
    foodSearchDropDownOption: '<img src="<%= thumbnailURL %>" width="40" ' +
      'height="40" alt="food thumbnail"><span class="search__name">' +
      '<%= name %></span>',
    /** Represents a food item HTML template.
      * @memberof HealthTracker.Templates.
      */
    foodListItem:
      '<img src="<%= thumbnailURL %>" class="food-list__thumbnail"' +
      ' width="40" height="40" alt=food thumbnail">' +
      '<div class="food-list__information">' +
      '<span class="food-list__name"><%= name %></span><div>' +
      '<small>cal: <%= calories %>,</small>' +
      '<small>fat (g): <%= fat %></small></div></div>' +
      '<button class="btn food-list__remove">remove</button>'
  }
})();
