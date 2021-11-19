import {createElement} from '../../helper';

class RestaurantList extends HTMLElement {
  connectedCallback() {
    this._renderSkeleton();
  }

  /**
   * @param {Array} restoList An array data to iterate.
   */
  set restoList(restoList) {
    this._renderRestaurantList(restoList);
  }

  _renderSkeleton() {
    const numberItemSkeleton = 6;
    for (let index = 0; index < numberItemSkeleton; index++) {
      const restaurantItemElement = createElement('resto-item');
      restaurantItemElement.renderSkeleton();
      this.appendChild(restaurantItemElement.firstElementChild);
    }
  }

  _renderRestaurantList(restoList) {
    this.innerHTML = '';
    restoList.forEach((resto) => {
      const restaurantItemElement = createElement('resto-item');
      restaurantItemElement.restoData = resto;
      this.appendChild(restaurantItemElement.firstElementChild);
    });
  }
}

customElements.define('resto-list', RestaurantList);
