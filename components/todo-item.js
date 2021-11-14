const { TodosBase } = require('./todos-base');

class TodoItemProps {
  completed;
  title;

  onTodoStatusChange;

  static className = 'todo-item';
  static dataName = 'data-todo-item';

  static checkedClassName = TodoItemProps.className + '-checked';
  static hideClassName = TodoItemProps.className + '-hide';

  static checkboxDataName = TodoItemProps.dataName + '-checkbox';
  static contentDataName = TodoItemProps.dataName + '-content';
  static templateDataName = TodoItemProps.dataName + '-template';
}

class TodoItem extends TodosBase {
  content = null;
  checkbox = null;

  onTodoStatusChangeHandler;

  constructor(elem, props) {
    super(elem, 'li', TodoItemProps.className);

    if(!elem) {
      this.createCheckbox();
      this.createContent();
    } else {
      this.checkbox = elem.querySelector(`[${TodoItemProps.checkboxDataName}]`);
      this.content = elem.querySelector(`[${TodoItemProps.contentDataName}]`);
    }

    if(this.checkbox) {      
      this.onTodoStatusChangeHandler = () => {
        if(this.checkbox?.checked) {    
          this.elem.classList.add(TodoItemProps.checkedClassName);
        } else {
          this.elem.classList.remove(TodoItemProps.checkedClassName);
        }        

        props?.onTodoStatusChange?.(this)
      };

      this.checkbox.checked = props?.completed ?? this.checkbox.checked ?? false;
      this.checkbox.addEventListener('change', this.onTodoStatusChangeHandler);

      if(props?.completed) {
        this.elem.classList.add(TodoItemProps.checkedClassName);
      }
    }

    if(this.content && props?.title) {
      this.content.textContent = props?.title;
    }
  }

  get contentElem() {
    return this.content;
  }

  get checkboxElem() {
    return this.checkbox;
  }

  createContent() {
    const elem = document.createElement('span');

    this.content = elem;

    this.elem.appendChild(elem);    
  }

  createCheckbox() {
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

    this.elem.appendChild(labelElem);
    
    this.checkbox = checkbox;
  }

  destroy() {
    this.checkbox?.removeEventListener('change', this.onTodoStatusChangeHandler);
  }

  static init(todosListElem, props) {
    const elems = todosListElem.querySelectorAll(`[${TodoItemProps.dataName}]`);

    const items = [];

    for(let elem of elems) {
      const item = new TodoItem(elem, props);

      items.push(item);
    }

    return items;
  }
}

exports.TodoItemProps = TodoItemProps;
exports.TodoItem = TodoItem;