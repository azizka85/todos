import TodosBase from './TodosBase';
import TodosList from './TodosList';
import TodosGlobals from '../TodosGlobals';

export default class Todos extends TodosBase {  
  _header = null;
  _list = null;

  constructor(elem) {
    super(elem, 'div', TodosGlobals.todosClassName);

    if(!elem) {
      this._createHeader();
      this._createList();
    } else {
      this._header = elem.querySelector(`[${TodosGlobals.todosHeaderDataName}]`);
      this._list = TodosList.init(elem);
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

    this.component.appendChild(this._header);
  }

  _createList() {
    this._list = new TodosList();

    this.component.appendChild(this._list.component);
  }

  static init() {
    const elems = document.querySelectorAll(`[${TodosGlobals.todosDataName}]`);

    const todosRoots = [];

    for(let elem of elems) {
      const todos = new Todos(elem);

      todosRoots.push(todos);
    }

    return todosRoots;
  }
}