import Presenter from './presenter';

class RestaurantListPresenter extends Presenter {
  constructor({view, model}) {
    super({view: view, model: model});
  }

  async showContent() {
    try {
      const allRestaurantList = await this._model.getAllRestaurant();
      allRestaurantList.length > 0 ?
        this._displayContent(allRestaurantList) :
        this._displayMessage('Daftar restaurant kosong');
    } catch (error) {
      this._displayMessage(error.message);
    }
  }
}

export default RestaurantListPresenter;
