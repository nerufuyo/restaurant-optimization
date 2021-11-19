import RestaurantListPresenter from '../../presenter/restaurant-list';
import RestaurantDetailPresenter from '../../presenter/restaurant-details';

import RestaurantDataSource from '../../data/restaurant-data-source';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

import {createElement} from '../../helper';

// Pages entry
import './home-page';
import './detail-page';
import './favorite-page';


const home = () => {
  return new RestaurantListPresenter({
    view: createElement('home-page'),
    model: RestaurantDataSource,
  });
};

const favorite = () => {
  return new RestaurantListPresenter({
    view: createElement('favorite-page'),
    model: FavoriteRestaurantIdb,
  });
};

const detail = () => {
  return new RestaurantDetailPresenter({
    view: createElement('detail-page'),
    model: {
      detail: RestaurantDataSource,
      favorite: FavoriteRestaurantIdb,
    },
  });
};

export {home, favorite, detail};
