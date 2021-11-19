/* eslint-disable max-len */
import RestaurantDataSource from '../../src/scripts/data/restaurant-data-source';
import {createElement, getElement, getAllElement} from '../../src/scripts/helper';
import dummyData from '../helper/dummy-data';
import RestaurantListPresenter from '../../src/scripts/presenter/restaurant-list';

import '../../src/scripts/view/pages/home-page';
import '../../src/scripts/view/components/_restaurant-list';
import '../../src/scripts/view/components/_restaurant-item';


describe('Restaurant List Presenter', () => {
  const initWithData = async (data) => {
    spyOn(RestaurantDataSource, 'getAllRestaurant').and.returnValue(data);
    const view = createElement('home-page');
    const model = RestaurantDataSource;
    const presenter = new RestaurantListPresenter({view, model});

    document.body.innerHTML = '';
    document.body.appendChild(presenter.view);
    await presenter.showContent();
  };

  describe('When restaurant list is not empty', () => {
    beforeEach(async () => {
      await initWithData(dummyData.restaurants);
    });

    it('should call the model to get all restaurant list', () => {
      expect(RestaurantDataSource.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    it('should show the entire list of restaurants with the correct number', () => {
      expect(getAllElement('.resto__item').length)
          .toEqual(dummyData.restaurants.length);
    });

    it('should show all restaurants list content correctly', () => {
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
            .toEqual(`🏠 ${city}`);
      });
    });
  });

  describe('When restaurant list is empty', () => {
    beforeEach(async () => {
      await initWithData([]);
    });

    it('should call the model to get all restaurant list', () => {
      expect(RestaurantDataSource.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    it('should show the information that empty restaurant list', () => {
      const messageElement = getElement('.message');
      expect(messageElement.children[0].textContent)
          .toEqual('Upss.. 😢');
      expect(messageElement.children[1].textContent)
          .toEqual('Daftar restaurant kosong');
    });

    it('should not show restaurant list', () => {
      expect(getElement('article.resto__item'))
          .toBeFalsy();
    });
  });
});

