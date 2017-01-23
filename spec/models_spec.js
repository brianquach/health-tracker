var HTModels = HealthTracker.Models;

describe('FoodItem', function() {
  var foodItem = new HTModels.FoodItem({
    name: 'test food'
  });

  it('has a name', function() {
    expect(foodItem).toBeDefined();
    expect(foodItem.get('name')).toBe('test food');
  })
});
