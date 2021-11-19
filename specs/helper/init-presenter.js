/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';
import RestaurantDataSource from '../../src/scripts/data/restaurant-data-source';
import {createElement} from '../../src/scripts/helper';
import RestaurantDetailPresenter from '../../src/scripts/presenter/restaurant-details';
import dummyData from './dummy-data';

const initRestaurantDetailPresenter = async () => {
  spyOn(RestaurantDataSource, 'getRestaurantDetail')
      .and.returnValue(dummyData.getRestaurantDetail.restaurant);
  const view = createElement('detail-page');
  const model = {
    detail: RestaurantDataSource,
    favorite: FavoriteRestaurantIdb,
  };
  const presenter = new RestaurantDetailPresenter({view, model});
  document.body.innerHTML = '';
  document.body.appendChild(presenter.view);
  await presenter.showContent();
};

export {initRestaurantDetailPresenter};
