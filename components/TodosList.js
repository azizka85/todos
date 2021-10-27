import TodosBase from "./TodosBase";
import TodoItem from './TodoItem';
import TodosListHeader from './TodosListHeader';
import TodosListFooter, { TodosListDisplayMode } from './TodosListFooter';
import TodosGlobals from "../TodosGlobals";

export default class TodosList extends TodosBase {
  _header = null;
  _footer = null;  
  _itemTemplate = null;

  _mode = null;
  _props = null;

  _items = [];

  constructor(elem, props) {
    super(elem, 'ul', TodosGlobals.todosListClassName);

    this._props = props;

    const headerProps = {
      onDisplayChanged: this._changeListDisplay.bind(this),
      onCreateTodo: (title) => this.addItem(title, false)
    };

    const footerProps = {
      onChangeDisplayMode: this.changeDisplayMode.bind(this),
      onClearCompleted: this.clearCompleted.bind(this)
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
    this.changeDisplayMode(TodosListDisplayMode.All); 
  }

  get props() {
    return this._props;
  }

  get mode() {
    return this._mode;
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

    const elem = this._itemTemplate?.cloneNode?.(true);

    const item = new TodoItem(elem, itemProps);

    this._addTodoItemComponent(item);
    this._changeItemDisplayMode(item);

    this._items.push(item);

    this._changeFooterContent();
    this._props?.onDataChanged?.();

    return item;
  }

  removeItems(items) {
    this._removeItems(items, true);

    this._changeFooterContent();

    this._props?.onDataChanged?.();
  }

  changeDisplayMode(mode) {
    if(this._mode !== mode) {
      this._mode = mode;

      for(let item of this._items) {
        this._changeItemDisplayMode(item);
      }
    }

    if(this._footer) {
      if(this._footer.displayAllBtn) {
        if(this._mode === TodosListDisplayMode.All) {
          this._footer.displayAllBtn.classList?.add?.(TodosGlobals.todosListFooterButtonActiveClassName);
        } else {
          this._footer.displayAllBtn.classList?.remove?.(TodosGlobals.todosListFooterButtonActiveClassName);
        }
      }

      if(this._footer.displayActiveBtn) {
        if(this._mode === TodosListDisplayMode.Active) {
          this._footer.displayActiveBtn.classList?.add?.(TodosGlobals.todosListFooterButtonActiveClassName);
        } else {
          this._footer.displayActiveBtn.classList?.remove?.(TodosGlobals.todosListFooterButtonActiveClassName);
        }
      }

      if(this._footer.displayCompletedBtn) {
        if(this._mode === TodosListDisplayMode.Completed) {
          this._footer.displayCompletedBtn.classList?.add?.(TodosGlobals.todosListFooterButtonActiveClassName);
        } else {
          this._footer.displayCompletedBtn.classList?.remove?.(TodosGlobals.todosListFooterButtonActiveClassName);
        }
      }
    }
  }

  clearCompleted() {
    const items = [];

    for(let item of this._items) {
      if(item.checkbox?.checked) {
        items.push(item);
      }
    }

    this.removeItems(items);
  }

  _removeItems(items, fromArray) {
    for(let item of items) {
      const index = this._items.indexOf(item);
      if(index >= 0) {
        this.component.removeChild(item.component);
        if(fromArray) this._items.splice(index, 1);        
      }
    }
  }

  _addTodoItemComponent(item) {
    if(this._footer) {
      this.component.insertBefore(item.component, this._footer.component);
    } else {
      this.component.appendChild(item.component);
    }    
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
    if(this._header?.display ?? true) {
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

  _changeItemDisplayMode(item) {
    item.component.style.display = 
      this._mode === TodosListDisplayMode.All 
        || (this._mode === TodosListDisplayMode.Completed && item.checkbox?.checked)
        || (this._mode === TodosListDisplayMode.Active && !item.checkbox?.checked)
      ? ''
      : 'none';

    if(item.checkbox?.checked) {    
      item.component.classList.add(TodosGlobals.todoItemCheckedClassName);
    } else {
      item.component.classList.remove(TodosGlobals.todoItemCheckedClassName);
    }      
  }

  _todoStatusChanged(item) {
    this._changeItemDisplayMode(item); 

    this._props?.onDataChanged?.();
  }

  static init(todosElem, props) {
    const elem = todosElem.querySelector(`[${TodosGlobals.todosListDataName}]`);

    if(elem) {
      return new TodosList(elem, props);
    } else {
      return null;
    }    
  }
}