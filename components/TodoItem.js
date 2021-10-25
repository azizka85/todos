import TodosBase from './TodosBase';
import TodosGlobals from '../TodosGlobals';

export default class TodoItem extends TodosBase {
  _container = null;
  _checkbox = null;

  constructor(elem, props) {
    super(elem, 'li', TodosGlobals.todoItemClassName);

    if(!elem) {
      this._checkbox = this._createCheckbox();
      this._container = this._createContainer();
    } else {
      this._checkbox = elem.querySelector(`[${TodosGlobals.todoItemCheckboxDataName}]`);
      this._container = elem.querySelector(`[${TodosGlobals.todoItemContainerDataName}]`);     
    }

    if(this._checkbox) {
      this._checkbox.checked = props?.completed ?? false;
      this._checkbox.addEventListener('change', (event) => props?.onTodoStatusChange?.(event));
    }

    if(this._container) {
      if(props?.title) {
        this._container.textContent = props?.title;
      }
    }
  }

  get container() {
    return this._container;
  }

  get checkbox() {
    return this._checkbox;
  }

  _createContainer() {
    const elem = document.createElement('span');

    this.component.appendChild(elem);

    return elem;
  }

  _createCheckbox() {
    const labelElem = document.createElement('label');
    const checkbox = document.createElement('input');    
    const spanElem = document.createElement('span');

    checkbox.type = 'checkbox';

    spanElem.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path 
          d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"
        />
      </svg>
    `;

    labelElem.appendChild(checkbox);
    labelElem.appendChild(spanElem);

    this.component.appendChild(labelElem);

    return checkbox;
  }

  static init(todosListElem, props) {
    const elems = todosListElem.querySelectorAll(`[${TodosGlobals.todoItemDataName}]`);

    const items = [];

    for(let elem of elems) {
      const item = new TodoItem(elem, props);

      items.push(item);
    }

    return items;
  }
}