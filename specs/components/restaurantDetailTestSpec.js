import '../../src/scripts/view/components/_restaurant-info';
import '../../src/scripts/view/components/_restaurant-review';
import '../../src/scripts/view/components/_restaurant-details';
import dummyData from '../helper/dummy-data';

describe('Restaurant Detail Element', () => {
  let restaurantDetailElement;

  beforeEach(() =>{
    document.body.innerHTML = '<resto-details></resto-details>';
    restaurantDetailElement = document.querySelector('resto-details');
  });

  describe('When restaurant details data not set yet', () => {
    it('should show skeleton', () => {
      expect(restaurantDetailElement.querySelector('.skeleton'))
          .toBeTruthy();
    });
  });

  describe('When restaurant details data is set', () => {
    beforeEach(() => {
      restaurantDetailElement.details = dummyData.restaurant;
    });

    it('should remove skeleton correctly', () => {
      expect(restaurantDetailElement.querySelector('.skeleton'))
          .toBeFalsy();
    });

    it('should show restaurants detail content', () => {
      expect(restaurantDetailElement.querySelector('.description'))
          .toBeTruthy();
      expect(restaurantDetailElement.querySelector('.info'))
          .toBeTruthy();
      expect(restaurantDetailElement.querySelector('.main-info'))
          .toBeTruthy();
      expect(restaurantDetailElement.querySelector('resto-review'))
          .toBeTruthy();
    });
  });
});

