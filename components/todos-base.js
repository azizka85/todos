class TodosBase {
  elem;

  constructor(elem, tagName, className) {
    if(!elem) {
      this.elem = this.createElement(tagName, className);
    } else {
      this.elem = elem;
    }
  }

  createElement(tagName, className) {
    const elem = document.createElement(tagName || 'div');
    
    if(className) {
      elem.classList.add(className);
    }

    return elem;
  }
}

exports.TodosBase = TodosBase;