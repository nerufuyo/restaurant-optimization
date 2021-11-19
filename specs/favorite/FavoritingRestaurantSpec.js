/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';
import {getElement} from '../../src/scripts/helper';
import dummyData from '../helper/dummy-data';

import '../../src/scripts/view/components/_restaurant-details';
import '../../src/scripts/view/components/_restaurant-info';
import '../../src/scripts/view/components/_restaurant-review';
import '../../src/scripts/view/pages/detail-page';
import {clearIdb} from '../helper/idb-helper';
import {initRestaurantDetailPresenter} from '../helper/init-presenter';

describe('Favoriting A Restaurant', () => {
  const {id, name, description, pictureId, city, rating} =
    dummyData.getRestaurantDetail.restaurant;

  beforeEach(async () => {
    await initRestaurantDetailPresenter();
  });
  afterEach(async () => {
    await clearIdb();
  });

  describe('When the restaurant has not been favorited before', () => {
    it('should display the favorite button', () => {
      const favButtonElement = getElement('#fav-button');
      expect(favButtonElement.textContent).toEqual('+');
      expect(favButtonElement.getAttribute('aria-label')).toEqual(
          'Tambahkan restaurant ini ke daftar favorite Anda',
      );
      expect(favButtonElement.title).toEqual(
          'Tambahkan restaurant ini ke daftar favorite Anda',
      );
    });

    it('should not display the unfavorited button', () => {
      const favButtonElement = getElement('#fav-button');
      expect(favButtonElement.textContent).not.toEqual('×');
      expect(favButtonElement.getAttribute('aria-label')).not.toEqual(
          'Hapus restaurant ini dari daftar favorite Anda',
      );
      expect(favButtonElement.title).not.toEqual(
          'Hapus restaurant ini dari daftar favorite Anda',
      );
    });
  });

  describe('When favorite button clicked', () => {
    it('should display the unfavorite button', (done) => {
      const favButtonElement = getElement('#fav-button');
      const testIt = () => {
        expect(favButtonElement.textContent).toEqual('×');
        expect(favButtonElement.getAttribute('aria-label')).toEqual(
            'Hapus restaurant ini dari daftar favorite Anda',
        );
        expect(favButtonElement.title).toEqual(
            'Hapus restaurant ini dari daftar favorite Anda',
        );
        done();
      };
      getElement('resto-details').addEventListener('fav-btn:updated', testIt);
      favButtonElement.dispatchEvent(new Event('click'));
    });

    it('should show a snackbar to notify the restaurant has been successfully added to favorites', (done) => {
      const favButtonElement = getElement('#fav-button');
      const testIt = () => {
        expect(getElement('#snackbar').textContent).toEqual(
            'Restaurant berhasil ditambahkan ke favorite',
        );
        done();
      };
      getElement('resto-details').addEventListener('snackbar:updated', testIt);
      favButtonElement.dispatchEvent(new Event('click'));
    });

    it('should store information of restaurant to Idb', (done) => {
      const favButtonElement = getElement('#fav-button');
      const testIt = async () => {
        expect(await FavoriteRestaurantIdb.getRestaurant(id)).toEqual({
          id,
          name,
          description,
          pictureId,
          city,
          rating,
        });
        done();
      };
      getElement('resto-details').addEventListener('snackbar:updated', testIt);
      favButtonElement.dispatchEvent(new Event('click'));
    });

    it('should not add a restaurant again when its already favorited', (done) => {
      (async () => {
        await FavoriteRestaurantIdb.putRestaurant({
          id,
          name,
          description,
          pictureId,
          city,
          rating,
        });
        const favButtonElement = getElement('#fav-button');
        const testIt = async () => {
          expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([
            {id, name, description, pictureId, city, rating},
          ]);
          done();
        };
        getElement('resto-details').addEventListener(
            'snackbar:updated',
            testIt,
        );
        favButtonElement.dispatchEvent(new Event('click'));
      })();
    });
  });
});
