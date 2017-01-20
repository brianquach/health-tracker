(function() {
  'use strict';

  var App = Backbone.View.extend({
    el: '#health-tracker',
    initialize: function() {
      this.totalCalories = this.$el.find('.total-calories');
      this.foodSearch = this.$el.find('.food-search');

      this.render();
      console.log('app init');
    },
    render: function() {
      this.totalCalories.html('0 cal');
      console.log('app render');
    }
  });
  var app = new App();
})();
