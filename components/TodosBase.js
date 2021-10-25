export default class TodosBase {
  _component;

  constructor(elem, tagName, className) {
    if(!elem) {
      this._component = this._createComponent(tagName, className);
    } else {
      this._component = elem;
    }
  }

  _createComponent(tagName, className) {
    const elem = document.createElement(tagName);
    elem.classList.add(className);

    return elem;
  }

  get component() {
    return this._component;
  }
}