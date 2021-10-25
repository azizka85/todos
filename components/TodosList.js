import TodosBase from "./TodosBase";
import TodoItem from './TodoItem';
import TodosListHeader from './TodosListHeader';
import TodosListFooter from './TodosListFooter';
import TodosGlobals from "../TodosGlobals";

export default class TodosList extends TodosBase {
  _header = null;
  _footer = null;  
  _itemTemplate = null;

  _items = [];

  constructor(elem) {
    super(elem, 'ul', TodosGlobals.todosListClassName);

    const headerProps = {
      onDisplayChanged: this._changeListDisplay.bind(this),
      onCreateTodo: (title) => this.addItem(title, false)
    };

    const footerProps = {
      onChangeDisplayMode: this._changeDisplayMode.bind(this),
      onClearCompleted: this._clearCompleted.bind(this)
    };

    const itemProps = {
      onTodoStatusChange: this._todoStatusChanged.bind(this)
    };

    if(!elem) {
      this._createHeader(headerProps);
      this._createFooter(footerProps);
    } else {
      this._header = TodosListHeader.init(elem, headerProps);
      this._footer = TodosListFooter.init(elem, footerProps);
      this._items = TodoItem.init(elem, itemProps);

      this._itemTemplate = document
        .querySelector(`[${TodosGlobals.todoItemTemplateDataName}]`)
        ?.content;

      if(!this._itemTemplate && this._items.length > 0) {
        this._itemTemplate = this._items[0].component.cloneNode(true);
      }
    }

    this._changeListDisplay();
    this._changeFooterContent();
  }

  get header() {
    return this._header;
  }

  get footer() {
    return this._footer;
  }

  get itemTemplate() {
    return this._itemTemplate;
  }

  get items() {
    return this._items;
  }

  addItem(title, completed) {
    const itemProps = {
      title,
      completed,
      onTodoStatusChange: this._todoStatusChanged.bind(this)
    };

    const item = new TodoItem(null, itemProps);

    this._addTodoItemComponent(item);

    this._items.push(item);

    this._changeFooterContent();

    return item;
  }

  removeItems(items) {
    this._removeItems(items, true);
  }

  _addTodoItemComponent(item) {
    if(this._footer) {
      this.component.insertBefore(item.component, this._footer.component);
    } else {
      this.component.appendChild(item.component);
    }
  }

  _removeItems(items, fromArray) {
    for(let item of items) {
      const index = this._items.indexOf(item);
      if(index >= 0) {
        this.component.removeChild(item.component);
        if(fromArray) this._items.splice(index, 1);
      }
    }

    this._changeFooterContent();
  }

  _createHeader(props) {
    this._header = new TodosListHeader(null, props);

    this.component.appendChild(this._header.component);
  }

  _createFooter(props) {
    this._footer = new TodosListFooter(null, props);

    this.component.appendChild(this._footer.component);
  }
  
  _changeListDisplay() {
    if(this._header.display) {
      for(let item of this._items) {
        this._addTodoItemComponent(item);
      }
    } else {
      this._removeItems(this._items, false);
    }
  }  

  _changeFooterContent() {
    if(this._footer && this._footer.container) {
      this._footer.container.textContent = this._items.length;
    }
  }

  _changeDisplayMode(mode) {
    console.log(mode);
  }

  _clearCompleted() {
    console.log('Clear completed');
  }

  _todoStatusChanged(event) {
    console.log(event);
  }

  static init(todosElem) {
    const elem = todosElem.querySelector(`[${TodosGlobals.todosListDataName}]`);

    if(elem) {
      return new TodosList(elem);
    } else {
      return null;
    }    
  }
}