const { TodosBase } = require('./todos-base');
const { TodosListDisplayMode, TodosFooterProps } = require('./todos-footer');
const { TodoItem, TodoItemProps } = require('./todo-item');

class TodosListProps {
  onTodoStatusChange;

  static className = 'todos-list';  
  static dataName = 'data-todos-list';  

  static hideClassName = TodosListProps.className + '-hide';
}

class TodosList extends TodosBase {
  itemTemplate = null;

  mode;
  items = [];

  props;

  constructor(elem, props) {
    super(elem, 'ul', TodosListProps.className);

    this.props = props;

    if(elem) {
      this.items = TodoItem.init(elem, {
        onTodoStatusChange: (item) => {
          this.updateItemDisplayMode(item);

          props?.onTodoStatusChange?.(item);
        }
      });

      this.itemTemplate = document
        .querySelector(`[${TodoItemProps.templateDataName}]`)
        ?.content
        ?.querySelector(`[${TodoItemProps.dataName}]`);
    }

    this.changeDisplayMode(TodosFooterProps.defaultDisplayListMode);
  }

  get displayMode() {
    return this.mode;
  }

  get itemsList() {
    return this.items;
  }

  addItem(title, completed) {
    const elem = this.itemTemplate?.cloneNode?.(true);

    const item = new TodoItem(elem, {
      title,
      completed,
      onTodoStatusChange: (item) => {
        this.updateItemDisplayMode(item);

        this.props?.onTodoStatusChange?.(item);
      }
    });

    this.elem.appendChild(item.elem);

    this.updateItemDisplayMode(item);

    this.items.push(item);

    return item;
  }

  changeDisplayMode(mode) {
    this.mode = mode;

    for(let item of this.items) {
      this.updateItemDisplayMode(item);
    }
  }

  changeListDisplay(display) {
    if(display) {
      this.elem.classList.remove(TodosListProps.hideClassName);
    } else {
      this.elem.classList.add(TodosListProps.hideClassName);
    }
  }

  clearCompleted() {
    const items = [];

    for(let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if(item.checkbox?.checked) {
        this.elem.removeChild(item.elem);
      } else {
        items.push(item);
      }
    }

    this.items = items;
  }

  updateItemDisplayMode(item) {
    if(this.mode === TodosListDisplayMode.All 
      || (this.mode === TodosListDisplayMode.Completed && item.checkbox?.checked)
      || (this.mode === TodosListDisplayMode.Active && !item.checkbox?.checked)
    ) {
      item.elem.classList.remove(TodoItemProps.hideClassName);  
    } else {
      item.elem.classList.add(TodoItemProps.hideClassName);
    }    
  }

  destroy() {
    for(let item of this.items) {
      item.destroy();
    }
  }

  static init(todosElem, props) {
    const elem = todosElem.querySelector(`[${TodosListProps.dataName}]`);

    if(elem) {
      return new TodosList(elem, props);
    } else {
      return null;
    }    
  }
}

exports.TodosList = TodosList;
exports.TodosListProps = TodosListProps;