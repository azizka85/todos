import TodosBase from './TodosBase';
import TodosList from './TodosList';
import TodosGlobals from '../TodosGlobals';

export default class Todos extends TodosBase {  
  _header = null;
  _list = null;

  constructor(elem, props) {
    super(elem, 'div', TodosGlobals.todosClassName);

    if(!elem) {
      this._createHeader();
      this._createList(props);
    } else {
      this._header = elem.querySelector(`[${TodosGlobals.todosHeaderDataName}]`);
      this._list = TodosList.init(elem, props);
    }
  }

  get header() {
    return this._header;
  }

  get list() {
    return this._list;
  }

  _createHeader() {
    this._header = document.createElement('div');
    this._header.classList.add(TodosGlobals.todosHeaderClassName);

    this._header.textContent = 'todos';

    this.component.appendChild(this._header);
  }

  _createList(props) {
    this._list = new TodosList(null, props);

    this.component.appendChild(this._list.component);
  }

  static init(props) {
    const elems = document.querySelectorAll(`[${TodosGlobals.todosDataName}]`);

    const todosRoots = [];

    for(let elem of elems) {
      const todos = new Todos(elem, props);

      todosRoots.push(todos);
    }

    return todosRoots;
  }
}