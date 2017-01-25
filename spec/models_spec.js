var HTModels = HealthTracker.Models;

describe('Health Tracker Models', function() {
  describe('FoodItem', function() {
    var foodItem = new HTModels.FoodItem({
      name: 'test food',
      calories: 100
    });

    it('has a name', function() {
      expect(foodItem).toBeDefined();
      expect(foodItem.get('name')).toBe('test food');
    });

    it('has calories', function() {
      expect(foodItem).toBeDefined();
      expect(foodItem.get('calories')).toBe(100);
    });
  });

  describe('FoodCollection', function() {
    var foodItem = new HTModels.FoodItem({
      name: 'test food'
    });
    var foodCollection = new HTModels.FoodCollection();
    foodCollection.add(foodItem);

    it('model is a FoodItem', function() {
      expect(foodCollection).toBeDefined();
      expect(foodCollection.model).toEqual(HTModels.FoodItem);
    });

    it('has one food item', function() {
      expect(foodCollection).toBeDefined();
      expect(foodCollection.length).toEqual(1);
    });
  });

  describe('SearchFoodCollection', function() {
    var foodItem = new HTModels.FoodItem({
      name: 'test food'
    });
    var searchFoodCollection = new HTModels.SearchFoodCollection();
    searchFoodCollection.add(foodItem);

    it('model is a FoodItem', function() {
      expect(searchFoodCollection).toBeDefined();
      expect(searchFoodCollection.model).toEqual(HTModels.FoodItem);
    });

    it('has one food item', function() {
      expect(searchFoodCollection).toBeDefined();
      expect(searchFoodCollection.length).toEqual(1);
    });
  });
});
