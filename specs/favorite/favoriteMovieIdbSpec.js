/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';
import itActsAsFavoriteRestaurantModel from '../contract/favoriteRestaurantContract';
import {clearIdb} from '../helper/idb-helper';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    await clearIdb();
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
