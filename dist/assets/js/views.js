var HealthTracker=HealthTracker||{};HealthTracker.Views=function(){"use strict";var t,e,o,i={"x-app-id":"fff9731b","x-app-key":"a9c550a6a475c562adf3ecfa44ec748a"},a=HealthTracker.Models,s=HealthTracker.Templates,r=HealthTracker.Collections,n=Backbone.View.extend({el:".js-food-search",events:{"keydown .js-search":"searchFoods"},initialize:function(){this.search=this.$el.find(".js-search"),this.foodChoices=this.$el.find(".js-food-choices"),this.searchFoodCollection=new r.SearchFoodCollection,this.searchErrorMsg=this.$el.find(".js-search-error").hide(),this.itemSearchErrorMsg=this.$el.find(".js-item-search-error").hide(),this.noResultsMsg=this.$el.find(".js-no-results").hide(),this.loading=this.$el.find(".js-loading").hide(),this.on({foodselected:this.clearSearch,itemsearcherror:this.itemSearchError,itemStartloading:this.itemStartLoading,itemStoploading:this.itemStopLoading})},render:function(){var t,e=this;e.foodChoices.html(""),this.searchFoodCollection.each(function(o){t=new l({model:o}),e.foodChoices.append(t.render().el)})},searchFoods:_.debounce(function(t){var e=this,o=this.search.val().trim();return this.searchFoodCollection.reset(),this.noResultsMsg.hide(),o?(this.loading.show(),void $.ajax("https://trackapi.nutritionix.com/v2/search/instant",{method:"GET",data:{query:o,self:!1,branded:!1},headers:i}).done(function(t){var o,i=t.common;_.forEach(i,function(t){o=new a.FoodItem({name:t.food_name,thumbnailURL:t.photo.thumb}),e.searchFoodCollection.add(o)}),i.length<1&&e.noResultsMsg.show(),e.render()}).fail(function(){e.searchErrorMsg.show(),e.render()}).always(function(){e.loading.hide()})):void this.clearSearch()},400),clearSearch:function(){this.search.val(""),this.searchFoodCollection.reset(),this.foodChoices.html("")},itemSearchError:function(){this.itemSearchErrorMsg.show(),this.clearSearch()},itemStartLoading:function(){this.loading.show()},itemStopLoading:function(){this.loading.hide()}}),l=Backbone.View.extend({tagName:"li",events:{click:"select"},template:_.template(s.foodSearchDropDownOption),render:function(){return this.$el.html(this.template(this.model.attributes)),this},select:function(){var e=this.model.get("name");t.trigger("itemStartloading"),$.ajax("https://trackapi.nutritionix.com/v2/natural/nutrients/",{method:"POST",data:{query:e,num_servings:1},headers:i}).done(function(e){var i=e.foods[0],s=new a.FoodItem({name:i.food_name,calories:Math.round(i.nf_calories),fat:Math.round(i.nf_total_fat),thumbnailURL:i.photo.thumb});o.add(s),o.saveToLocalStorage(),t.trigger("foodselected")}).fail(function(){t.trigger("itemsearcherror")}).always(function(){t.trigger("itemStoploading")})}}),h=Backbone.View.extend({el:".js-food-list",initialize:function(){this.listenTo(o,"add",this.render)},render:function(t){var e=new c({model:t});this.$el.append(e.render().el)}}),c=Backbone.View.extend({tagName:"li",template:_.template(s.foodListItem),events:{"click .food-list__remove":"removeFoodItem"},render:function(){return this.$el.html(this.template(this.model.attributes)),this},removeFoodItem:function(){o.remove(this.model),this.$el.remove(),o.saveToLocalStorage()}}),d=Backbone.View.extend({el:"#health-tracker",initialize:function(){this.totalCaloriesEl=this.$el.find(".js-total-calories"),this.totalFatEl=this.$el.find(".js-total-fat"),this.totalCalories=0,this.totalFat=0,o=new r.FoodCollection,t=new n,e=new h,this.listenTo(o,"add",this.addStats),this.listenTo(o,"remove",this.subtractStats);var i=localStorage.getItem("healthTrackerFoodList");i&&this.loadState(i),this.render()},render:function(){this.totalCaloriesEl.html(this.totalCalories+" cal"),this.totalFatEl.html(this.totalFat+" g")},addStats:function(t){this.totalCalories+=t.get("calories"),this.totalCaloriesEl.html(this.totalCalories+" cal"),this.totalFat+=t.get("fat"),this.totalFatEl.html(this.totalFat+" g")},subtractStats:function(t){this.totalCalories-=t.get("calories"),this.totalCaloriesEl.html(this.totalCalories+" cal"),this.totalFat-=t.get("fat"),this.totalFatEl.html(this.totalFat+" g")},loadState:function(t){var e,i=JSON.parse(t);_.forEach(i,function(t){e=new a.FoodItem({name:t.name,calories:t.calories,fat:t.fat,thumbnailURL:t.thumbnailURL}),o.add(e)})}}),m=function(){new d};return{init:m}}(),HealthTracker.Views.init();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzLmpzIl0sIm5hbWVzIjpbIkhlYWx0aFRyYWNrZXIiLCJWaWV3cyIsInNlYXJjaFZpZXciLCJmb29kTGlzdFZpZXciLCJmb29kQ29sbGVjdGlvbiIsIm51dHJpdGlvbml4SGVhZGVyIiwieC1hcHAtaWQiLCJ4LWFwcC1rZXkiLCJIVE1vZGVscyIsIk1vZGVscyIsIkhUVGVtcGxhdGVzIiwiVGVtcGxhdGVzIiwiSFRDb2xsZWN0aW9ucyIsIkNvbGxlY3Rpb25zIiwiU2VhcmNoVmlldyIsIkJhY2tib25lIiwiVmlldyIsImV4dGVuZCIsImVsIiwiZXZlbnRzIiwia2V5ZG93biAuanMtc2VhcmNoIiwiaW5pdGlhbGl6ZSIsInRoaXMiLCJzZWFyY2giLCIkZWwiLCJmaW5kIiwiZm9vZENob2ljZXMiLCJzZWFyY2hGb29kQ29sbGVjdGlvbiIsIlNlYXJjaEZvb2RDb2xsZWN0aW9uIiwic2VhcmNoRXJyb3JNc2ciLCJoaWRlIiwiaXRlbVNlYXJjaEVycm9yTXNnIiwibm9SZXN1bHRzTXNnIiwibG9hZGluZyIsIm9uIiwiZm9vZHNlbGVjdGVkIiwiY2xlYXJTZWFyY2giLCJpdGVtc2VhcmNoZXJyb3IiLCJpdGVtU2VhcmNoRXJyb3IiLCJpdGVtU3RhcnRsb2FkaW5nIiwiaXRlbVN0YXJ0TG9hZGluZyIsIml0ZW1TdG9wbG9hZGluZyIsIml0ZW1TdG9wTG9hZGluZyIsInJlbmRlciIsImZvb2RJdGVtIiwic2VsZiIsImh0bWwiLCJlYWNoIiwiZiIsIlNlYXJjaEl0ZW1WaWV3IiwibW9kZWwiLCJhcHBlbmQiLCJzZWFyY2hGb29kcyIsIl8iLCJkZWJvdW5jZSIsImUiLCJxdWVyeSIsInZhbCIsInRyaW0iLCJyZXNldCIsInNob3ciLCIkIiwiYWpheCIsIm1ldGhvZCIsImRhdGEiLCJicmFuZGVkIiwiaGVhZGVycyIsImRvbmUiLCJyZXNwIiwiZm9vZEl0ZW1zIiwiY29tbW9uIiwiZm9yRWFjaCIsIkZvb2RJdGVtIiwibmFtZSIsImZvb2RfbmFtZSIsInRodW1ibmFpbFVSTCIsInBob3RvIiwidGh1bWIiLCJhZGQiLCJsZW5ndGgiLCJmYWlsIiwiYWx3YXlzIiwidGFnTmFtZSIsImNsaWNrIiwidGVtcGxhdGUiLCJmb29kU2VhcmNoRHJvcERvd25PcHRpb24iLCJhdHRyaWJ1dGVzIiwic2VsZWN0IiwiZ2V0IiwidHJpZ2dlciIsIm51bV9zZXJ2aW5ncyIsImZvb2QiLCJmb29kcyIsImNhbG9yaWVzIiwiTWF0aCIsInJvdW5kIiwibmZfY2Fsb3JpZXMiLCJmYXQiLCJuZl90b3RhbF9mYXQiLCJzYXZlVG9Mb2NhbFN0b3JhZ2UiLCJGb29kTGlzdFZpZXciLCJsaXN0ZW5UbyIsImZvb2RMaXN0SXRlbVZpZXciLCJGb29kTGlzdEl0ZW1WaWV3IiwiZm9vZExpc3RJdGVtIiwiY2xpY2sgLmZvb2QtbGlzdF9fcmVtb3ZlIiwicmVtb3ZlRm9vZEl0ZW0iLCJyZW1vdmUiLCJBcHAiLCJ0b3RhbENhbG9yaWVzRWwiLCJ0b3RhbEZhdEVsIiwidG90YWxDYWxvcmllcyIsInRvdGFsRmF0IiwiRm9vZENvbGxlY3Rpb24iLCJhZGRTdGF0cyIsInN1YnRyYWN0U3RhdHMiLCJzdG9yZWRTdGF0ZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2FkU3RhdGUiLCJzdGF0ZSIsIkpTT04iLCJwYXJzZSIsImZpIiwiaW5pdCJdLCJtYXBwaW5ncyI6IkFBU0EsR0FBSUEsZUFBZ0JBLGlCQVVwQkEsZUFBY0MsTUFBUSxXQUNwQixZQUVBLElBUUlDLEdBQ0FDLEVBQ0FDLEVBVkFDLEdBQ0ZDLFdBQVksV0FDWkMsWUFBYSxvQ0FFWEMsRUFBV1IsY0FBY1MsT0FDekJDLEVBQWNWLGNBQWNXLFVBQzVCQyxFQUFnQlosY0FBY2EsWUFhOUJDLEVBQWFDLFNBQVNDLEtBQUtDLFFBQzdCQyxHQUFJLGtCQUVKQyxRQUNFQyxxQkFBc0IsZUFHeEJDLFdBQVksV0FDVkMsS0FBS0MsT0FBU0QsS0FBS0UsSUFBSUMsS0FBSyxjQUM1QkgsS0FBS0ksWUFBY0osS0FBS0UsSUFBSUMsS0FBSyxvQkFDakNILEtBQUtLLHFCQUF1QixHQUFJZixHQUFjZ0IscUJBQzlDTixLQUFLTyxlQUFpQlAsS0FBS0UsSUFBSUMsS0FBSyxvQkFBb0JLLE9BQ3hEUixLQUFLUyxtQkFBcUJULEtBQUtFLElBQUlDLEtBQUsseUJBQXlCSyxPQUNqRVIsS0FBS1UsYUFBZVYsS0FBS0UsSUFBSUMsS0FBSyxrQkFBa0JLLE9BQ3BEUixLQUFLVyxRQUFVWCxLQUFLRSxJQUFJQyxLQUFLLGVBQWVLLE9BRTVDUixLQUFLWSxJQUNIQyxhQUFnQmIsS0FBS2MsWUFDckJDLGdCQUFtQmYsS0FBS2dCLGdCQUN4QkMsaUJBQW9CakIsS0FBS2tCLGlCQUN6QkMsZ0JBQW1CbkIsS0FBS29CLG1CQUk1QkMsT0FBUSxXQUNOLEdBQUlDLEdBQ0FDLEVBQU92QixJQUNYdUIsR0FBS25CLFlBQVlvQixLQUFLLElBQ3RCeEIsS0FBS0sscUJBQXFCb0IsS0FBSyxTQUFTQyxHQUN0Q0osRUFBVyxHQUFJSyxJQUFpQkMsTUFBT0YsSUFDdkNILEVBQUtuQixZQUFZeUIsT0FBT1AsRUFBU0QsU0FBU3pCLE9BSTlDa0MsWUFBYUMsRUFBRUMsU0FBUyxTQUFTQyxHQUMvQixHQUFJVixHQUFPdkIsS0FDUGtDLEVBQVFsQyxLQUFLQyxPQUFPa0MsTUFBTUMsTUFLOUIsT0FIQXBDLE1BQUtLLHFCQUFxQmdDLFFBQzFCckMsS0FBS1UsYUFBYUYsT0FFYjBCLEdBS0xsQyxLQUFLVyxRQUFRMkIsV0FFYkMsR0FBRUMsS0FBSyxzREFDTEMsT0FBUSxNQUNSQyxNQUNFUixNQUFPQSxFQUNQWCxNQUFNLEVBQ05vQixTQUFTLEdBRVhDLFFBQVM3RCxJQUNSOEQsS0FBSyxTQUFTQyxHQUNmLEdBQUl4QixHQUNBeUIsRUFBWUQsRUFBS0UsTUFDckJqQixHQUFFa0IsUUFBUUYsRUFBVyxTQUFTckIsR0FDNUJKLEVBQVcsR0FBSXBDLEdBQVNnRSxVQUN0QkMsS0FBTXpCLEVBQUUwQixVQUNSQyxhQUFjM0IsRUFBRTRCLE1BQU1DLFFBRXhCaEMsRUFBS2xCLHFCQUFxQm1ELElBQUlsQyxLQUc1QnlCLEVBQVVVLE9BQVMsR0FDckJsQyxFQUFLYixhQUFhNEIsT0FHcEJmLEVBQUtGLFdBQ0pxQyxLQUFLLFdBQ05uQyxFQUFLaEIsZUFBZStCLE9BQ3BCZixFQUFLRixXQUNKc0MsT0FBTyxXQUNScEMsRUFBS1osUUFBUUgsY0FsQ2JSLE1BQUtjLGVBb0NOLEtBRUhBLFlBQWEsV0FDWGQsS0FBS0MsT0FBT2tDLElBQUksSUFDaEJuQyxLQUFLSyxxQkFBcUJnQyxRQUMxQnJDLEtBQUtJLFlBQVlvQixLQUFLLEtBR3hCUixnQkFBaUIsV0FDZmhCLEtBQUtTLG1CQUFtQjZCLE9BQ3hCdEMsS0FBS2MsZUFHUEksaUJBQWtCLFdBQ2hCbEIsS0FBS1csUUFBUTJCLFFBR2ZsQixnQkFBaUIsV0FDZnBCLEtBQUtXLFFBQVFILFVBWWJtQixFQUFpQmxDLFNBQVNDLEtBQUtDLFFBQy9CaUUsUUFBUyxLQUVUL0QsUUFDRWdFLE1BQVMsVUFHWEMsU0FBVS9CLEVBQUUrQixTQUFTMUUsRUFBWTJFLDBCQUVqQzFDLE9BQVEsV0FFTixNQURBckIsTUFBS0UsSUFBSXNCLEtBQUt4QixLQUFLOEQsU0FBUzlELEtBQUs0QixNQUFNb0MsYUFDaENoRSxNQUdUaUUsT0FBUSxXQUNOLEdBQUkvQixHQUFRbEMsS0FBSzRCLE1BQU1zQyxJQUFJLE9BRTNCdEYsR0FBV3VGLFFBQVEsb0JBRW5CNUIsRUFBRUMsS0FBSywwREFDTEMsT0FBUSxPQUNSQyxNQUNFUixNQUFPQSxFQUNQa0MsYUFBYyxHQUVoQnhCLFFBQVM3RCxJQUNSOEQsS0FBSyxTQUFTQyxHQUNmLEdBQUl1QixHQUFPdkIsRUFBS3dCLE1BQU0sR0FDbEJoRCxFQUFXLEdBQUlwQyxHQUFTZ0UsVUFDMUJDLEtBQU1rQixFQUFLakIsVUFDWG1CLFNBQVVDLEtBQUtDLE1BQU1KLEVBQUtLLGFBQzFCQyxJQUFLSCxLQUFLQyxNQUFNSixFQUFLTyxjQUNyQnZCLGFBQWNnQixFQUFLZixNQUFNQyxPQUczQnpFLEdBQWUwRSxJQUFJbEMsR0FDbkJ4QyxFQUFlK0YscUJBQ2ZqRyxFQUFXdUYsUUFBUSxrQkFDbEJULEtBQUssV0FDTjlFLEVBQVd1RixRQUFRLHFCQUNsQlIsT0FBTyxXQUNSL0UsRUFBV3VGLFFBQVEsd0JBWXZCVyxFQUFlckYsU0FBU0MsS0FBS0MsUUFDL0JDLEdBQUksZ0JBRUpHLFdBQVksV0FDVkMsS0FBSytFLFNBQVNqRyxFQUFnQixNQUFPa0IsS0FBS3FCLFNBRzVDQSxPQUFRLFNBQVNDLEdBQ2YsR0FBSTBELEdBQW1CLEdBQUlDLElBQW1CckQsTUFBT04sR0FDckR0QixNQUFLRSxJQUFJMkIsT0FBT21ELEVBQWlCM0QsU0FBU3pCLE9BVzFDcUYsRUFBbUJ4RixTQUFTQyxLQUFLQyxRQUNuQ2lFLFFBQVMsS0FFVEUsU0FBVS9CLEVBQUUrQixTQUFTMUUsRUFBWThGLGNBRWpDckYsUUFDRXNGLDJCQUE0QixrQkFHOUI5RCxPQUFRLFdBRU4sTUFEQXJCLE1BQUtFLElBQUlzQixLQUFLeEIsS0FBSzhELFNBQVM5RCxLQUFLNEIsTUFBTW9DLGFBQ2hDaEUsTUFHVG9GLGVBQWdCLFdBQ2R0RyxFQUFldUcsT0FBT3JGLEtBQUs0QixPQUMzQjVCLEtBQUtFLElBQUltRixTQUNUdkcsRUFBZStGLHdCQVlmUyxFQUFNN0YsU0FBU0MsS0FBS0MsUUFDdEJDLEdBQUksa0JBRUpHLFdBQVksV0FDVkMsS0FBS3VGLGdCQUFrQnZGLEtBQUtFLElBQUlDLEtBQUssc0JBQ3JDSCxLQUFLd0YsV0FBYXhGLEtBQUtFLElBQUlDLEtBQUssaUJBQ2hDSCxLQUFLeUYsY0FBZ0IsRUFDckJ6RixLQUFLMEYsU0FBVyxFQUVoQjVHLEVBQWlCLEdBQUlRLEdBQWNxRyxlQUVuQy9HLEVBQWEsR0FBSVksR0FDakJYLEVBQWUsR0FBSWlHLEdBRW5COUUsS0FBSytFLFNBQVNqRyxFQUFnQixNQUFPa0IsS0FBSzRGLFVBQzFDNUYsS0FBSytFLFNBQVNqRyxFQUFnQixTQUFVa0IsS0FBSzZGLGNBRTdDLElBQUlDLEdBQWNDLGFBQWFDLFFBQVEsd0JBQ25DRixJQUNGOUYsS0FBS2lHLFVBQVVILEdBR2pCOUYsS0FBS3FCLFVBR1BBLE9BQVEsV0FDTnJCLEtBQUt1RixnQkFBZ0IvRCxLQUFLeEIsS0FBS3lGLGNBQWdCLFFBQy9DekYsS0FBS3dGLFdBQVdoRSxLQUFLeEIsS0FBSzBGLFNBQVcsT0FHdkNFLFNBQVUsU0FBU3RFLEdBQ2pCdEIsS0FBS3lGLGVBQWlCbkUsRUFBUzRDLElBQUksWUFDbkNsRSxLQUFLdUYsZ0JBQWdCL0QsS0FBS3hCLEtBQUt5RixjQUFnQixRQUMvQ3pGLEtBQUswRixVQUFZcEUsRUFBUzRDLElBQUksT0FDOUJsRSxLQUFLd0YsV0FBV2hFLEtBQUt4QixLQUFLMEYsU0FBVyxPQUd2Q0csY0FBZSxTQUFTdkUsR0FDdEJ0QixLQUFLeUYsZUFBaUJuRSxFQUFTNEMsSUFBSSxZQUNuQ2xFLEtBQUt1RixnQkFBZ0IvRCxLQUFLeEIsS0FBS3lGLGNBQWdCLFFBQy9DekYsS0FBSzBGLFVBQVlwRSxFQUFTNEMsSUFBSSxPQUM5QmxFLEtBQUt3RixXQUFXaEUsS0FBS3hCLEtBQUswRixTQUFXLE9BR3ZDTyxVQUFXLFNBQVNDLEdBQ2xCLEdBQ0k1RSxHQURBeUIsRUFBWW9ELEtBQUtDLE1BQU1GLEVBRTNCbkUsR0FBRWtCLFFBQVFGLEVBQVcsU0FBU3NELEdBQzVCL0UsRUFBVyxHQUFJcEMsR0FBU2dFLFVBQ3RCQyxLQUFNa0QsRUFBR2xELEtBQ1RvQixTQUFVOEIsRUFBRzlCLFNBQ2JJLElBQUswQixFQUFHMUIsSUFDUnRCLGFBQWNnRCxFQUFHaEQsZUFFbkJ2RSxFQUFlMEUsSUFBSWxDLFFBVXJCZ0YsRUFBTyxXQUNHLEdBQUloQixHQUdsQixRQUNFZ0IsS0FBTUEsTUFJVjVILGNBQWNDLE1BQU0ySCIsImZpbGUiOiJ2aWV3cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQXBwbGljYXRpb24gdmlldyBsb2dpYy5cbiAqIEF1dGhvcjogQnJpYW4gUXVhY2hcbiAqL1xuXG4vKipcbiAgKiBIZWFsdGggVHJhY2tlciBuYW1lc3BhY2UuXG4gICogQG5hbWVzcGFjZSBIZWFsdGhUcmFja2VyXG4gICovXG52YXIgSGVhbHRoVHJhY2tlciA9IEhlYWx0aFRyYWNrZXIgfHwge307XG5cbi8qKlxuICAqIEVuY2Fwc3VsdGVzIGFsbCB2aWV3cy5cbiAgKiBAbmFtZXNwYWNlIEhlYWx0aFRyYWNrZXIuVmlld3NcbiAgKiBAcHJvcGVydHkge29iamVjdH0gbnV0cml0aW9uaXhIZWFkZXIgSG9sZHMgQVBJIElEIGFuZCBLRVkgZm9yIGFjY2VzcyB0b1xuICAqICAgTnV0cml0aW9ueCBBUEkuXG4gICogQHByb3BlcnR5IHtvYmplY3R9IEhUTW9kZWxzIGFsaWFzIGZvciBIZWFsdGhUcmFja2VyLk1vZGVscyBuYW1lc3BhY2UuXG4gICogQHByb3BlcnR5IHtvYmplY3R9IEhUVGVtcGxhdGVzIGFsaWFzIGZvciBIZWFsdGhUcmFja2VyLlRlbXBsYXRlcyBuYW1lc3BhY2UuXG4gICovXG5IZWFsdGhUcmFja2VyLlZpZXdzID0gKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG51dHJpdGlvbml4SGVhZGVyID0ge1xuICAgIFwieC1hcHAtaWRcIjogJ2ZmZjk3MzFiJyxcbiAgICBcIngtYXBwLWtleVwiOiAnYTljNTUwYTZhNDc1YzU2MmFkZjNlY2ZhNDRlYzc0OGEnXG4gIH07XG4gIHZhciBIVE1vZGVscyA9IEhlYWx0aFRyYWNrZXIuTW9kZWxzO1xuICB2YXIgSFRUZW1wbGF0ZXMgPSBIZWFsdGhUcmFja2VyLlRlbXBsYXRlcztcbiAgdmFyIEhUQ29sbGVjdGlvbnMgPSBIZWFsdGhUcmFja2VyLkNvbGxlY3Rpb25zO1xuXG4gIHZhciBzZWFyY2hWaWV3O1xuICB2YXIgZm9vZExpc3RWaWV3O1xuICB2YXIgZm9vZENvbGxlY3Rpb247XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIGZvb2Qgc2VhcmNoIHZpZXcuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAbWVtYmVyb2YgSGVhbHRoVHJhY2tlci5WaWV3c35cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIHNlYXJjaFZpZXcgPSBuZXcgU2VhcmNoVmlldygpO1xuICAgKi9cbiAgdmFyIFNlYXJjaFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgZWw6ICcuanMtZm9vZC1zZWFyY2gnLFxuXG4gICAgZXZlbnRzOiB7XG4gICAgICAna2V5ZG93biAuanMtc2VhcmNoJzogJ3NlYXJjaEZvb2RzJyxcbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNlYXJjaCA9IHRoaXMuJGVsLmZpbmQoJy5qcy1zZWFyY2gnKTtcbiAgICAgIHRoaXMuZm9vZENob2ljZXMgPSB0aGlzLiRlbC5maW5kKCcuanMtZm9vZC1jaG9pY2VzJyk7XG4gICAgICB0aGlzLnNlYXJjaEZvb2RDb2xsZWN0aW9uID0gbmV3IEhUQ29sbGVjdGlvbnMuU2VhcmNoRm9vZENvbGxlY3Rpb24oKTtcbiAgICAgIHRoaXMuc2VhcmNoRXJyb3JNc2cgPSB0aGlzLiRlbC5maW5kKCcuanMtc2VhcmNoLWVycm9yJykuaGlkZSgpO1xuICAgICAgdGhpcy5pdGVtU2VhcmNoRXJyb3JNc2cgPSB0aGlzLiRlbC5maW5kKCcuanMtaXRlbS1zZWFyY2gtZXJyb3InKS5oaWRlKCk7XG4gICAgICB0aGlzLm5vUmVzdWx0c01zZyA9IHRoaXMuJGVsLmZpbmQoJy5qcy1uby1yZXN1bHRzJykuaGlkZSgpO1xuICAgICAgdGhpcy5sb2FkaW5nID0gdGhpcy4kZWwuZmluZCgnLmpzLWxvYWRpbmcnKS5oaWRlKCk7XG5cbiAgICAgIHRoaXMub24oe1xuICAgICAgICAnZm9vZHNlbGVjdGVkJzogdGhpcy5jbGVhclNlYXJjaCxcbiAgICAgICAgJ2l0ZW1zZWFyY2hlcnJvcic6IHRoaXMuaXRlbVNlYXJjaEVycm9yLFxuICAgICAgICAnaXRlbVN0YXJ0bG9hZGluZyc6IHRoaXMuaXRlbVN0YXJ0TG9hZGluZyxcbiAgICAgICAgJ2l0ZW1TdG9wbG9hZGluZyc6IHRoaXMuaXRlbVN0b3BMb2FkaW5nLFxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZm9vZEl0ZW07XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBzZWxmLmZvb2RDaG9pY2VzLmh0bWwoJycpO1xuICAgICAgdGhpcy5zZWFyY2hGb29kQ29sbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgZm9vZEl0ZW0gPSBuZXcgU2VhcmNoSXRlbVZpZXcoeyBtb2RlbDogZiB9KTtcbiAgICAgICAgc2VsZi5mb29kQ2hvaWNlcy5hcHBlbmQoZm9vZEl0ZW0ucmVuZGVyKCkuZWwpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNlYXJjaEZvb2RzOiBfLmRlYm91bmNlKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBxdWVyeSA9IHRoaXMuc2VhcmNoLnZhbCgpLnRyaW0oKTtcblxuICAgICAgdGhpcy5zZWFyY2hGb29kQ29sbGVjdGlvbi5yZXNldCgpO1xuICAgICAgdGhpcy5ub1Jlc3VsdHNNc2cuaGlkZSgpO1xuXG4gICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmcuc2hvdygpO1xuXG4gICAgICAkLmFqYXgoJ2h0dHBzOi8vdHJhY2thcGkubnV0cml0aW9uaXguY29tL3YyL3NlYXJjaC9pbnN0YW50Jywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgIHNlbGY6IGZhbHNlLFxuICAgICAgICAgIGJyYW5kZWQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWRlcnM6IG51dHJpdGlvbml4SGVhZGVyXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgdmFyIGZvb2RJdGVtO1xuICAgICAgICB2YXIgZm9vZEl0ZW1zID0gcmVzcC5jb21tb247XG4gICAgICAgIF8uZm9yRWFjaChmb29kSXRlbXMsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICBmb29kSXRlbSA9IG5ldyBIVE1vZGVscy5Gb29kSXRlbSh7XG4gICAgICAgICAgICBuYW1lOiBmLmZvb2RfbmFtZSxcbiAgICAgICAgICAgIHRodW1ibmFpbFVSTDogZi5waG90by50aHVtYlxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNlbGYuc2VhcmNoRm9vZENvbGxlY3Rpb24uYWRkKGZvb2RJdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGZvb2RJdGVtcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgc2VsZi5ub1Jlc3VsdHNNc2cuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5yZW5kZXIoKTtcbiAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuc2VhcmNoRXJyb3JNc2cuc2hvdygpO1xuICAgICAgICBzZWxmLnJlbmRlcigpO1xuICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLmxvYWRpbmcuaGlkZSgpO1xuICAgICAgfSk7XG4gICAgfSwgNDAwKSxcblxuICAgIGNsZWFyU2VhcmNoOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2VhcmNoLnZhbCgnJyk7XG4gICAgICB0aGlzLnNlYXJjaEZvb2RDb2xsZWN0aW9uLnJlc2V0KCk7XG4gICAgICB0aGlzLmZvb2RDaG9pY2VzLmh0bWwoJycpO1xuICAgIH0sXG5cbiAgICBpdGVtU2VhcmNoRXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pdGVtU2VhcmNoRXJyb3JNc2cuc2hvdygpO1xuICAgICAgdGhpcy5jbGVhclNlYXJjaCgpO1xuICAgIH0sXG5cbiAgICBpdGVtU3RhcnRMb2FkaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMubG9hZGluZy5zaG93KCk7XG4gICAgfSxcblxuICAgIGl0ZW1TdG9wTG9hZGluZzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmxvYWRpbmcuaGlkZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIGZvb2Qgc2VhcmNoIGRyb3Bkb3duIG9wdGlvbiB2aWV3LlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQG1lbWJlcm9mIEhlYWx0aFRyYWNrZXIuVmlld3N+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbCAtIFRoZSBGb29kSXRlbSBNb2RlbC5cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIHNlYXJjaEl0ZW1WaWV3ID0gbmV3IFNlYXJjaEl0ZW1WaWV3KHsgbW9kZWw6IG5ldyBGb29kSXRlbSgpIH0pO1xuICAgKi9cbiAgdmFyIFNlYXJjaEl0ZW1WaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgICAgdGFnTmFtZTogJ2xpJyxcblxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayc6ICdzZWxlY3QnXG4gICAgICB9LFxuXG4gICAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShIVFRlbXBsYXRlcy5mb29kU2VhcmNoRHJvcERvd25PcHRpb24pLFxuXG4gICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUodGhpcy5tb2RlbC5hdHRyaWJ1dGVzKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgc2VsZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5tb2RlbC5nZXQoJ25hbWUnKTtcblxuICAgICAgICBzZWFyY2hWaWV3LnRyaWdnZXIoJ2l0ZW1TdGFydGxvYWRpbmcnKTtcblxuICAgICAgICAkLmFqYXgoJ2h0dHBzOi8vdHJhY2thcGkubnV0cml0aW9uaXguY29tL3YyL25hdHVyYWwvbnV0cmllbnRzLycsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICBudW1fc2VydmluZ3M6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBoZWFkZXJzOiBudXRyaXRpb25peEhlYWRlclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgICB2YXIgZm9vZCA9IHJlc3AuZm9vZHNbMF07XG4gICAgICAgICAgdmFyIGZvb2RJdGVtID0gbmV3IEhUTW9kZWxzLkZvb2RJdGVtKHtcbiAgICAgICAgICAgIG5hbWU6IGZvb2QuZm9vZF9uYW1lLFxuICAgICAgICAgICAgY2Fsb3JpZXM6IE1hdGgucm91bmQoZm9vZC5uZl9jYWxvcmllcyksXG4gICAgICAgICAgICBmYXQ6IE1hdGgucm91bmQoZm9vZC5uZl90b3RhbF9mYXQpLFxuICAgICAgICAgICAgdGh1bWJuYWlsVVJMOiBmb29kLnBob3RvLnRodW1iXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmb29kQ29sbGVjdGlvbi5hZGQoZm9vZEl0ZW0pO1xuICAgICAgICAgIGZvb2RDb2xsZWN0aW9uLnNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICAgIHNlYXJjaFZpZXcudHJpZ2dlcignZm9vZHNlbGVjdGVkJyk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VhcmNoVmlldy50cmlnZ2VyKCdpdGVtc2VhcmNoZXJyb3InKTtcbiAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlYXJjaFZpZXcudHJpZ2dlcignaXRlbVN0b3Bsb2FkaW5nJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICB9KTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyB0aGUgZm9vZCBsaXN0IHZpZXcuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAbWVtYmVyb2YgSGVhbHRoVHJhY2tlci5WaWV3c35cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIGZvb2RMaXN0VmlldyA9IG5ldyBGb29kTGlzdFZpZXcoKTtcbiAgICovXG4gIHZhciBGb29kTGlzdFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgZWw6ICcuanMtZm9vZC1saXN0JyxcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5saXN0ZW5Ubyhmb29kQ29sbGVjdGlvbiwgJ2FkZCcsIHRoaXMucmVuZGVyKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbihmb29kSXRlbSkge1xuICAgICAgdmFyIGZvb2RMaXN0SXRlbVZpZXcgPSBuZXcgRm9vZExpc3RJdGVtVmlldyh7IG1vZGVsOiBmb29kSXRlbSB9KTtcbiAgICAgIHRoaXMuJGVsLmFwcGVuZChmb29kTGlzdEl0ZW1WaWV3LnJlbmRlcigpLmVsKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIHRoZSBmb29kIGxpc3QgaXRlbSB2aWV3LlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQG1lbWJlcm9mIEhlYWx0aFRyYWNrZXIuVmlld3N+XG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBmb29kTGlzdEl0ZW1WaWV3ID0gbmV3IEZvb2RMaXN0SXRlbVZpZXcoKTtcbiAgICovXG4gIHZhciBGb29kTGlzdEl0ZW1WaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6ICdsaScsXG5cbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShIVFRlbXBsYXRlcy5mb29kTGlzdEl0ZW0pLFxuXG4gICAgZXZlbnRzOiB7XG4gICAgICAnY2xpY2sgLmZvb2QtbGlzdF9fcmVtb3ZlJzogJ3JlbW92ZUZvb2RJdGVtJ1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHRoaXMubW9kZWwuYXR0cmlidXRlcykpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlbW92ZUZvb2RJdGVtOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvb2RDb2xsZWN0aW9uLnJlbW92ZSh0aGlzLm1vZGVsKTtcbiAgICAgIHRoaXMuJGVsLnJlbW92ZSgpO1xuICAgICAgZm9vZENvbGxlY3Rpb24uc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyB0aGUgSGVhbHRoIFRyYWNrZXIgYXBwIHZpZXcuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAbWVtYmVyb2YgSGVhbHRoVHJhY2tlci5WaWV3c1xuICAgKiBAcHJvcGVydHkge29iamVjdH0gZWwgVmlldyBlbGVtZW50LlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgYXBwID0gbmV3IEFwcCgpO1xuICAgKi9cbiAgdmFyIEFwcCA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICBlbDogJyNoZWFsdGgtdHJhY2tlcicsXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudG90YWxDYWxvcmllc0VsID0gdGhpcy4kZWwuZmluZCgnLmpzLXRvdGFsLWNhbG9yaWVzJyk7XG4gICAgICB0aGlzLnRvdGFsRmF0RWwgPSB0aGlzLiRlbC5maW5kKCcuanMtdG90YWwtZmF0Jyk7XG4gICAgICB0aGlzLnRvdGFsQ2Fsb3JpZXMgPSAwO1xuICAgICAgdGhpcy50b3RhbEZhdCA9IDA7XG5cbiAgICAgIGZvb2RDb2xsZWN0aW9uID0gbmV3IEhUQ29sbGVjdGlvbnMuRm9vZENvbGxlY3Rpb24oKTtcblxuICAgICAgc2VhcmNoVmlldyA9IG5ldyBTZWFyY2hWaWV3KCk7XG4gICAgICBmb29kTGlzdFZpZXcgPSBuZXcgRm9vZExpc3RWaWV3KCk7XG5cbiAgICAgIHRoaXMubGlzdGVuVG8oZm9vZENvbGxlY3Rpb24sICdhZGQnLCB0aGlzLmFkZFN0YXRzKTtcbiAgICAgIHRoaXMubGlzdGVuVG8oZm9vZENvbGxlY3Rpb24sICdyZW1vdmUnLCB0aGlzLnN1YnRyYWN0U3RhdHMpO1xuXG4gICAgICB2YXIgc3RvcmVkU3RhdGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGVhbHRoVHJhY2tlckZvb2RMaXN0Jyk7XG4gICAgICBpZiAoc3RvcmVkU3RhdGUpIHtcbiAgICAgICAgdGhpcy5sb2FkU3RhdGUoc3RvcmVkU3RhdGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy50b3RhbENhbG9yaWVzRWwuaHRtbCh0aGlzLnRvdGFsQ2Fsb3JpZXMgKyAnIGNhbCcpO1xuICAgICAgdGhpcy50b3RhbEZhdEVsLmh0bWwodGhpcy50b3RhbEZhdCArICcgZycpO1xuICAgIH0sXG5cbiAgICBhZGRTdGF0czogZnVuY3Rpb24oZm9vZEl0ZW0pIHtcbiAgICAgIHRoaXMudG90YWxDYWxvcmllcyArPSBmb29kSXRlbS5nZXQoJ2NhbG9yaWVzJyk7XG4gICAgICB0aGlzLnRvdGFsQ2Fsb3JpZXNFbC5odG1sKHRoaXMudG90YWxDYWxvcmllcyArICcgY2FsJyk7XG4gICAgICB0aGlzLnRvdGFsRmF0ICs9IGZvb2RJdGVtLmdldCgnZmF0Jyk7XG4gICAgICB0aGlzLnRvdGFsRmF0RWwuaHRtbCh0aGlzLnRvdGFsRmF0ICsgJyBnJyk7XG4gICAgfSxcblxuICAgIHN1YnRyYWN0U3RhdHM6IGZ1bmN0aW9uKGZvb2RJdGVtKSB7XG4gICAgICB0aGlzLnRvdGFsQ2Fsb3JpZXMgLT0gZm9vZEl0ZW0uZ2V0KCdjYWxvcmllcycpO1xuICAgICAgdGhpcy50b3RhbENhbG9yaWVzRWwuaHRtbCh0aGlzLnRvdGFsQ2Fsb3JpZXMgKyAnIGNhbCcpO1xuICAgICAgdGhpcy50b3RhbEZhdCAtPSBmb29kSXRlbS5nZXQoJ2ZhdCcpO1xuICAgICAgdGhpcy50b3RhbEZhdEVsLmh0bWwodGhpcy50b3RhbEZhdCArICcgZycpO1xuICAgIH0sXG5cbiAgICBsb2FkU3RhdGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICB2YXIgZm9vZEl0ZW1zID0gSlNPTi5wYXJzZShzdGF0ZSk7XG4gICAgICB2YXIgZm9vZEl0ZW07XG4gICAgICBfLmZvckVhY2goZm9vZEl0ZW1zLCBmdW5jdGlvbihmaSkge1xuICAgICAgICBmb29kSXRlbSA9IG5ldyBIVE1vZGVscy5Gb29kSXRlbSh7XG4gICAgICAgICAgbmFtZTogZmkubmFtZSxcbiAgICAgICAgICBjYWxvcmllczogZmkuY2Fsb3JpZXMsXG4gICAgICAgICAgZmF0OiBmaS5mYXQsXG4gICAgICAgICAgdGh1bWJuYWlsVVJMOiBmaS50aHVtYm5haWxVUkxcbiAgICAgICAgfSk7XG4gICAgICAgIGZvb2RDb2xsZWN0aW9uLmFkZChmb29kSXRlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgSGVhbHRoIFRyYWNrZXIgYXBwbGljYXRpb24uXG4gICAqIEBmdW5jdGlvblxuICAgKiBAbWVtYmVyb2YgSGVhbHRoVHJhY2tlci5WaWV3c35cbiAgICovXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXBwID0gbmV3IEFwcCgpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdFxuICB9O1xufSkoKTtcblxuSGVhbHRoVHJhY2tlci5WaWV3cy5pbml0KCk7XG4iXX0=
