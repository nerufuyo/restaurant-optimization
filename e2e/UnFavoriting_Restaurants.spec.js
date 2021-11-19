const assert = require('assert');

Feature('UnFavoriting Restaurants');

let firstRestaurantName;

Before(async ({I}) => {
  // Navigate to homepage
  I.amOnPage('/');

  // Resto list should display with their own names
  I.seeElement('.resto__name');
  const firstRestaurant = locate('.resto__name').first();
  firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  // Navigate to first resto detail
  I.click(firstRestaurant);

  // Fav Button should display
  I.seeElement('#fav-button');

  // Clicked fav button to favoriting its restaurant
  I.click('#fav-button');

  // Navigate to favorite resto page
  I.amOnPage('/#/favorite');
});

Scenario('Showing favorited restaurant', async ({I}) => {
  I.seeElement('favorite-page');
  const favoritedRestaurantName = await I.grabTextFrom('.resto__name');

  // Resto name that has been favorited should same.
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});

Scenario('Unfavoriting a restaurant', ({I}) => {
  I.seeElement('.resto__name');

  // Navigate to first resto detail
  I.click(locate('.resto__name').first());

  // Fav Button should display
  I.seeElement('#fav-button');
  // Fav Button clicked to unfavoriting this resto
  I.click('#fav-button');

  // After unfavorited button clicked, snackbar should displayed
  I.see('Restaurant berhasil dihapus dari favorite', '#snackbar');

  // Navigate to favorite resto page
  I.amOnPage('/#/favorite');

  // Favorite resto page should show empty resto
  I.seeElement('favorite-page');
  I.see('Daftar restaurant kosong', '.message__content');
});
