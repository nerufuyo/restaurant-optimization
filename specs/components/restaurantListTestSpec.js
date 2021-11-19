/* eslint-disable max-len */
import {getAllElement} from '../../src/scripts/helper';
import '../../src/scripts/view/components/_restaurant-item';
import '../../src/scripts/view/components/_restaurant-list';
import dummyData from '../helper/dummy-data';

describe('Restaurant List Element', () => {
  let restaurantElement;

  beforeEach(() =>{
    document.body.innerHTML = '<resto-list></resto-list>';
    restaurantElement = document.querySelector('resto-list');
  });

  describe('When restaurant list not set yet', () => {
    it('should show skeleton', () => {
      expect(restaurantElement.querySelector('.skeleton'))
          .toBeTruthy();
    });
  });

  describe('When restaurant list is set', () => {
    beforeEach(() => {
      restaurantElement.restoList = dummyData.restaurants;
    });

    it('should remove skeleton', () => {
      expect(restaurantElement.querySelector('.skeleton'))
          .toBeFalsy();
    });

    it('should show the entire list of restaurants with the correct number', () => {
      const restaurantItemElements = getAllElement('.resto__item');
      expect(restaurantItemElements.length)
          .toEqual(dummyData.restaurants.length);
    });

    it('should show all restaurants item content correctly', () => {
      const restaurantItemElements = getAllElement('.resto__item');
      restaurantItemElements.forEach((element, index) => {
        const {name, description, rating, city} = dummyData.restaurants[index];
        expect(element.querySelector('.resto__name').textContent)
            .toEqual(name);
        expect(element.querySelector('.resto__description').textContent)
            .toEqual(description);
        expect(element.querySelector('.resto__rating').textContent)
            .toEqual(`⭐ ${rating}`);
        expect(element.querySelector('.resto__city').textContent)
            .toEqual(`🗺 ${city}`);
      });
    });
  });
});
