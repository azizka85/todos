const { TodosBase } = require('./todos-base');
const { TodosHeader } = require('./todos-header');
const { TodosFooter } = require('./todos-footer');
const { TodosList } = require('./todos-list');

class TodosProps {
  onCreateTodo;
  onDisplayChanged;

  onChangeDisplayMode;
  onClearCompleted;

  onTodoStatusChange;

  static className = 'todos';
  static dataName = 'data-todos';

  static containerClassName = TodosProps.className + '-container';

  static titleClassName = TodosProps.className + '-title';
  static titleDataName = TodosProps.dataName + '-title';
}

class Todos extends TodosBase {
  title = null;
  header = null;
  list = null;
  footer = null;  

  onCreateTodoHandler;
  onDisplayChangedHandler;

  onChangeDisplayModeHandler;
  onClearCompletedHandler;

  onTodoStatusChangeHandler;

  constructor(elem, props) {
    super(elem, 'div', TodosProps.className);

    this.onCreateTodoHandler = (title) => {
      this.onCreateTodo(title);

      props?.onCreateTodo?.(title);
    };

    this.onDisplayChangedHandler = (display) => {
      this.onDisplayChanged(display);

      props?.onDisplayChanged?.(display);
    };

    this.onChangeDisplayModeHandler = (mode) => {
      this.onChangeDisplayMode(mode);

      props?.onChangeDisplayMode?.(mode);
    };

    this.onClearCompletedHandler = () => {
      this.onClearCompleted();

      props?.onClearCompleted?.();
    };

    this.onTodoStatusChangeHandler = (item) => {
      props?.onTodoStatusChange?.(item);
    };

    if(!elem) {
      this.createTitle();
      this.createContainer();
    } else {
      this.title = elem.querySelector(`[${TodosProps.titleDataName}]`);
      
      this.header = TodosHeader.init(elem, {
        onCreateTodo: this.onCreateTodoHandler,
        onDisplayChanged: this.onDisplayChangedHandler
      });

      this.list = TodosList.init(elem, {
        onTodoStatusChange: this.onTodoStatusChangeHandler
      });

      this.footer = TodosFooter.init(elem, {
        onChangeDisplayMode: this.onChangeDisplayModeHandler,
        onClearCompleted: this.onClearCompletedHandler
      });
    }

    if(this.footer?.info) {
      this.footer.info.textContent = this.list?.itemsList?.length;
    }
  }

  get titleElem() {
    return this.title;
  }

  get headerComponent() {
    return this.header;
  }

  get listComponent() {
    return this.list;
  }

  get footerComponent() {
    return this.footer;
  }

  createTitle() {
    this.title = document.createElement('div');
    this.title.classList.add(TodosProps.titleClassName);

    this.title.textContent = 'todos';

    this.elem.appendChild(this.title);
  }

  createContainer() {
    const container = document.createElement('div');

    container.classList.add(TodosProps.containerClassName);

    this.createHeader(container);
    this.createList(container);
    this.createFooter(container);

    this.elem.appendChild(container);
  }  

  createHeader(container) {
    this.header = new TodosHeader(null, {
      onCreateTodo: this.onCreateTodoHandler,
      onDisplayChanged: this.onDisplayChangedHandler
    });

    container.appendChild(this.header.elem);
  }

  createList(container) {
    this.list = new TodosList(null, {
      onTodoStatusChange: this.onTodoStatusChangeHandler
    });

    container.appendChild(this.list.elem);
  }

  createFooter(container) {
    this.footer = new TodosFooter(null, {
      onChangeDisplayMode: this.onChangeDisplayModeHandler,
      onClearCompleted: this.onClearCompletedHandler
    });

    container.appendChild(this.footer.elem);
  }

  onCreateTodo(title) {
    this.list?.addItem?.(title, false);
    
    if(this.footer?.info) {
      this.footer.info.textContent = this.list?.itemsList?.length;
    }
  }

  onDisplayChanged(display) {
    this.list?.changeListDisplay?.(display);
  }

  onChangeDisplayMode(mode) {
    this.list?.changeDisplayMode?.(mode);
  }

  onClearCompleted() {
    this.list?.clearCompleted?.();

    if(this.footer?.info) {
      this.footer.info.textContent = this.list?.itemsList?.length;
    }
  }

  destroy() {
    this.header?.destroy?.();
    this.list?.destroy?.();
    this.footer?.destroy?.();
  }

  static init(props) {
    const elems = document.querySelectorAll(`[${TodosProps.dataName}]`);

    const todosList = [];

    for(let elem of elems) {
      const todos = new Todos(elem, props);

      todosList.push(todos);
    }

    return todosList;
  }
}

exports.TodosProps = TodosProps;
exports.Todos = Todos;