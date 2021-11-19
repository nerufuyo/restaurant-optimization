/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';

const clearIdb = async () => {
  const allRestaurantdata = await FavoriteRestaurantIdb.getAllRestaurant();
  allRestaurantdata.forEach(async (resto) => {
    await FavoriteRestaurantIdb.deleteRestaurant(resto.id);
  });
};

export {clearIdb};
