var HealthTracker = HealthTracker || {};

HealthTracker.Views = (function() {
  'use strict';

  var SearchView = Backbone.View.extend({
    className: 'food-search',
    initialize: function() {
      this.search = this.$el.find('.search');

      console.log('search view init');
    }
  });

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

  var init = function() {
      var app = new App();
  };

  return {
    init: init
  };
})();

HealthTracker.Views.init();
