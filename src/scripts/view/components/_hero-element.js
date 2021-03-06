/* eslint-disable max-len */
import heroImage from '../../../public/images/hero/hero-image.jpg?sizes[]=425,sizes[]=768,sizes[]=1024,sizes[]=1350';
import heroImageWebp from '../../../public/images/hero/hero-image.jpg?sizes[]=425,sizes[]=768,sizes[]=1024,sizes[]=1350&format=webp';

class HeroElement extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = /* html*/ `
      <picture>
        ${this._createSourceElement(heroImage, 'jpeg')}
        ${this._createSourceElement(heroImageWebp, 'webp')}
        <img
          src="${heroImage.src}"        
          width="${heroImage.width}"
          height="${heroImage.height}"
          loading="lazy"
          alt="Gambar Hero"
        />
      </picture>
      <h1 class="hero__heading">Restaurant Catalog</h1>
      <p class="hero__tagline">Explore various flavors of Restaurant in one website</p>
    `;
  }

  _createSourceElement({images}, type) {
    let elements = '';
    images.forEach(({path, width}, index) => {
      elements += /* html*/ `
        <source
          media=${(index < images.length - 1) ?
              `'(max-width: ${width}px)'` :
              `'(min-width: ${images[index-1].width}px)'`}
          srcset="${path}"
          type="image/${type}">
      `;
    });
    return elements;
  }
}

customElements.define('hero-element', HeroElement);
