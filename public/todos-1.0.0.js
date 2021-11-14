(function () {
  'use strict';

  var main = {};

  var todosBase = {};

  class TodosBase$6 {
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

  todosBase.TodosBase = TodosBase$6;

  var todos$1 = {};

  var todosHeader = {};

  const { TodosBase: TodosBase$5 } = todosBase;

  class TodosHeaderProps$1 {
    onDisplayChanged;
    onCreateTodo;

    static className = 'todos-header';
    static dataName = 'data-todos-header';

    static iconHideClassName = TodosHeaderProps$1.className + '-icon-hide';

    static inputDataName = TodosHeaderProps$1.dataName + '-input';
    static downIconDataName = TodosHeaderProps$1.dataName + '-down';
    static rightIconDataName = TodosHeaderProps$1.dataName + '-right';
  }

  class TodosHeader$2 extends TodosBase$5 {  
    downIcon = null;
    rightIcon = null;
    input = null;

    downIconClickHandler;
    rightIconClickHandler;
    inputKeyUpHandler;

    constructor(elem, props) {
      super(elem, 'div', TodosHeaderProps$1.className);

      if(!elem) {
        this.createIcons();
        this.createInput();
      } else {
        this.downIcon = elem.querySelector(`[${TodosHeaderProps$1.downIconDataName}]`);
        this.rightIcon = elem.querySelector(`[${TodosHeaderProps$1.rightIconDataName}]`);
        this.input = elem.querySelector(`[${TodosHeaderProps$1.inputDataName}]`);
      }

      if(this.downIcon) {
        this.downIconClickHandler = () => {
          this.changeDisplay(false);

          props?.onDisplayChanged?.(false);
        };

        this.downIcon.addEventListener('click', this.downIconClickHandler);
      }

      if(this.rightIcon) {
        this.rightIconClickHandler = () => {
          this.changeDisplay(true);

          props?.onDisplayChanged?.(true);
        };

        this.rightIcon.addEventListener('click', this.rightIconClickHandler);
      }

      if(this.input) {
        this.inputKeyUpHandler = (event) => {
          const title = event.target.value?.trim?.();

          if(event.key === 'Enter' && title) {
            props?.onCreateTodo?.(title);

            event.target.value = '';
          }
        };

        this.input.addEventListener('keyup', this.inputKeyUpHandler);
      }

      this.changeDisplay(true);
    }

    get downIconElem() {
      return this.downIcon;
    }

    get rightIconElem() {
      return this.rightIcon;
    }

    get inputElem() {
      return this.input;
    }

    createIcons() {
      const spanElem = document.createElement('span');

      spanElem.innerHTML = `
      <svg viewBox="0 0 16 16" ${TodosHeaderProps$1.downIconDataName}>
        <path
          fillRule="evenodd"
          d="
            M1.646 4.646a.5.5 0 0 1 .708 0L8 
            10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 
            6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z
          "
        />
      </svg>
      <svg viewBox="0 0 16 16" ${TodosHeaderProps$1.rightIconDataName}>
        <path
          fillRule="evenodd"
          d="
            M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 
            .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 
            2.354a.5.5 0 0 1 0-.708z
          "
        />
      </svg>
    `;

      this.downIcon = spanElem.querySelector(`[${TodosHeaderProps$1.downIconDataName}]`);
      this.rightIcon = spanElem.querySelector(`[${TodosHeaderProps$1.rightIconDataName}]`);

      this.elem.appendChild(spanElem);
    }

    createInput() {
      this.input = document.createElement('input');

      this.input.placeholder = 'Enter new task';

      this.elem.appendChild(this.input);
    }

    changeDisplay(value) {
      if(this.rightIcon) {
        if(value) {
          this.rightIcon.classList.add(TodosHeaderProps$1.iconHideClassName);
        } else {
          this.rightIcon.classList.remove(TodosHeaderProps$1.iconHideClassName);
        }
      }
      if(this.downIcon) {
        if(value) {
          this.downIcon.classList.remove(TodosHeaderProps$1.iconHideClassName);
        } else {
          this.downIcon.classList.add(TodosHeaderProps$1.iconHideClassName);
        }
      }
    }

    destroy() {
      this.downIcon?.removeEventListener('click', this.downIconClickHandler);
      this.rightIcon?.removeEventListener('click', this.rightIconClickHandler);
      this.input?.removeEventListener('keyup', this.inputKeyUpHandler);
    }

    static init(todosElem, props) {
      const elem = todosElem.querySelector(`[${TodosHeaderProps$1.dataName}]`);

      if(elem) {
        return new TodosHeader$2(elem, props);
      } else {
        return null;
      }    
    }
  }

  todosHeader.TodosHeaderProps = TodosHeaderProps$1;
  todosHeader.TodosHeader = TodosHeader$2;

  var todosFooter = {};

  const { TodosBase: TodosBase$4 } = todosBase;

  const TodosListDisplayMode$2 = {
    All: 'all', 
    Active: 'active',
    Completed: 'completed'
  };

  class TodosFooterProps$2 {
    onChangeDisplayMode;
    onClearCompleted;

    static defaultDisplayListMode = TodosListDisplayMode$2.All;

    static className = 'todos-footer';
    static dataName = 'data-todos-footer';

    static infoClassName = TodosFooterProps$2.className + '-info';
    static infoDataName = TodosFooterProps$2.dataName + '-info';

    static buttonsClassName = TodosFooterProps$2.className + '-buttons';
    static buttonClassName = TodosFooterProps$2.className + '-button';
    static buttonActiveClassName = TodosFooterProps$2.buttonClassName + '-active';

    static displayAllBtnDataName = TodosFooterProps$2.dataName + '-display-all';
    static displayActiveBtnDataName = TodosFooterProps$2.dataName + '-display-active';
    static displayCompletedBtnDataName = TodosFooterProps$2.dataName + '-display-completed';
    static clearCompletedBtnDataName = TodosFooterProps$2.dataName + '-clear-completed';
  }

  class TodosFooter$2 extends TodosBase$4 {
    info = null;
    displayAllBtn = null;
    displayActiveBtn = null;
    displayCompletedBtn = null;
    clearCompletedBtn = null;

    displayAllBtnClickHandler;
    displayActiveBtnClickHandler;
    displayCompletedBtnClickHandler;
    clearCompletedBtnClickHandler;

    constructor(elem, props) {
      super(elem, 'div', TodosFooterProps$2.className);

      if(!elem) {
        this.createInfo();
        this.createButtons();
        this.createClearCompletedBtn();
      } else {
        this.info = elem.querySelector(`[${TodosFooterProps$2.infoDataName}]`);
        this.displayAllBtn = elem.querySelector(`[${TodosFooterProps$2.displayAllBtnDataName}]`);
        this.displayActiveBtn = elem.querySelector(`[${TodosFooterProps$2.displayActiveBtnDataName}]`);
        this.displayCompletedBtn = elem.querySelector(`[${TodosFooterProps$2.displayCompletedBtnDataName}]`);
        this.clearCompletedBtn = elem.querySelector(`[${TodosFooterProps$2.clearCompletedBtnDataName}]`);
      }

      if(this.displayAllBtn) {
        this.displayAllBtnClickHandler = () => {
          this.changeDisplayMode(TodosListDisplayMode$2.All);

          props?.onChangeDisplayMode?.(TodosListDisplayMode$2.All);
        };
        this.displayAllBtn.addEventListener('click', this.displayAllBtnClickHandler);
      }

      if(this.displayActiveBtn) {
        this.displayActiveBtnClickHandler = () => {
          this.changeDisplayMode(TodosListDisplayMode$2.Active);

          props?.onChangeDisplayMode?.(TodosListDisplayMode$2.Active);
        };
        this.displayActiveBtn.addEventListener('click', this.displayActiveBtnClickHandler);
      }

      if(this.displayCompletedBtn) {
        this.displayCompletedBtnClickHandler = () => {
          this.changeDisplayMode(TodosListDisplayMode$2.Completed);

          props?.onChangeDisplayMode?.(TodosListDisplayMode$2.Completed);
        };
        this.displayCompletedBtn.addEventListener('click', this.displayCompletedBtnClickHandler);
      }

      if(this.clearCompletedBtn) {
        this.clearCompletedBtnClickHandler = () => props?.onClearCompleted?.();
        this.clearCompletedBtn.addEventListener('click', this.clearCompletedBtnClickHandler);
      }

      this.changeDisplayMode(TodosFooterProps$2.defaultDisplayListMode);
    }

    get infoElem() {
      return this.info;
    }

    get displayAllBtnElem() {
      return this.displayAllBtn;
    }

    get displayActiveBtnElem() {
      return this.displayActiveBtn;
    }

    get displayCompletedBtnElem() {
      return this.displayCompletedBtn;
    }

    get clearCompletedBtnElem() {
      return this.clearCompletedBtn;
    }

    createInfo() {
      const elem = document.createElement('div');

      elem.classList.add(TodosFooterProps$2.infoClassName);
      elem.innerHTML = '<span></span> items left';

      this.info = elem.querySelector('span');

      this.elem.appendChild(elem);
    }

    createButtons() {
      const elem = document.createElement('div');

      elem.classList.add(TodosFooterProps$2.buttonsClassName);

      this.displayAllBtn = document.createElement('div');
      this.displayAllBtn.classList.add(TodosFooterProps$2.buttonClassName);
      this.displayAllBtn.textContent = 'All';

      this.displayActiveBtn = document.createElement('div');
      this.displayActiveBtn.classList.add(TodosFooterProps$2.buttonClassName);
      this.displayActiveBtn.textContent = 'Active';

      this.displayCompletedBtn = document.createElement('div');
      this.displayCompletedBtn.classList.add(TodosFooterProps$2.buttonClassName);
      this.displayCompletedBtn.textContent = 'Completed';

      elem.appendChild(this.displayAllBtn);
      elem.appendChild(this.displayActiveBtn);
      elem.appendChild(this.displayCompletedBtn);

      this.elem.appendChild(elem);
    }

    createClearCompletedBtn() {
      this.clearCompletedBtn = document.createElement('div');

      this.clearCompletedBtn.classList.add(TodosFooterProps$2.buttonClassName);
      this.clearCompletedBtn.classList.add(TodosFooterProps$2.buttonActiveClassName);
      this.clearCompletedBtn.textContent = 'Clear completed';

      this.elem.appendChild(this.clearCompletedBtn);
    }

    changeDisplayMode(mode) {
      if(mode === TodosListDisplayMode$2.All) {
        this.displayAllBtn?.classList.add(TodosFooterProps$2.buttonActiveClassName);
      } else {
        this.displayAllBtn?.classList.remove(TodosFooterProps$2.buttonActiveClassName);
      }

      if(mode === TodosListDisplayMode$2.Active) {
        this.displayActiveBtn?.classList.add(TodosFooterProps$2.buttonActiveClassName);
      } else {
        this.displayActiveBtn?.classList.remove(TodosFooterProps$2.buttonActiveClassName);
      }

      if(mode === TodosListDisplayMode$2.Completed) {
        this.displayCompletedBtn?.classList.add(TodosFooterProps$2.buttonActiveClassName);
      } else {
        this.displayCompletedBtn?.classList.remove(TodosFooterProps$2.buttonActiveClassName);
      }
    }

    destroy() {
      this.displayAllBtn?.removeEventListener('click', this.displayAllBtnClickHandler);
      this.displayActiveBtn?.removeEventListener('click', this.displayActiveBtnClickHandler);
      this.displayCompletedBtn?.removeEventListener('click', this.displayCompletedBtnClickHandler);
      this.clearCompletedBtn?.removeEventListener('click', this.clearCompletedBtnClickHandler);
    }

    static init(todosElem, props) {
      const elem = todosElem.querySelector(`[${TodosFooterProps$2.dataName}]`);

      if(elem) {
        return new TodosFooter$2(elem, props);
      } else {
        return null;
      }
    }
  }

  todosFooter.TodosListDisplayMode = TodosListDisplayMode$2;
  todosFooter.TodosFooterProps = TodosFooterProps$2;
  todosFooter.TodosFooter = TodosFooter$2;

  var todosList = {};

  var todoItem = {};

  const { TodosBase: TodosBase$3 } = todosBase;

  class TodoItemProps$2 {
    completed;
    title;

    onTodoStatusChange;

    static className = 'todo-item';
    static dataName = 'data-todo-item';

    static checkedClassName = TodoItemProps$2.className + '-checked';
    static hideClassName = TodoItemProps$2.className + '-hide';

    static checkboxDataName = TodoItemProps$2.dataName + '-checkbox';
    static contentDataName = TodoItemProps$2.dataName + '-content';
    static templateDataName = TodoItemProps$2.dataName + '-template';
  }

  class TodoItem$2 extends TodosBase$3 {
    content = null;
    checkbox = null;

    onTodoStatusChangeHandler;

    constructor(elem, props) {
      super(elem, 'li', TodoItemProps$2.className);

      if(!elem) {
        this.createCheckbox();
        this.createContent();
      } else {
        this.checkbox = elem.querySelector(`[${TodoItemProps$2.checkboxDataName}]`);
        this.content = elem.querySelector(`[${TodoItemProps$2.contentDataName}]`);
      }

      if(this.checkbox) {
        this.onTodoStatusChangeHandler = () => {
          if(this.checkbox?.checked) {    
            this.elem.classList.add(TodoItemProps$2.checkedClassName);
          } else {
            this.elem.classList.remove(TodoItemProps$2.checkedClassName);
          }        

          props?.onTodoStatusChange?.(this);
        };

        this.checkbox.checked = props?.completed ?? false;
        this.checkbox.addEventListener('change', this.onTodoStatusChangeHandler);

        if(props?.completed) {
          this.elem.classList.add(TodoItemProps$2.checkedClassName);
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
      const elems = todosListElem.querySelectorAll(`[${TodoItemProps$2.dataName}]`);

      const items = [];

      for(let elem of elems) {
        const item = new TodoItem$2(elem, props);

        items.push(item);
      }

      return items;
    }
  }

  todoItem.TodoItemProps = TodoItemProps$2;
  todoItem.TodoItem = TodoItem$2;

  const { TodosBase: TodosBase$2 } = todosBase;
  const { TodosListDisplayMode: TodosListDisplayMode$1, TodosFooterProps: TodosFooterProps$1 } = todosFooter;
  const { TodoItem: TodoItem$1, TodoItemProps: TodoItemProps$1 } = todoItem;

  class TodosListProps$1 {
    onTodoStatusChange;

    static className = 'todos-list';  
    static dataName = 'data-todos-list';  

    static hideClassName = TodosListProps$1.className + '-hide';
  }

  class TodosList$2 extends TodosBase$2 {
    itemTemplate = null;

    mode;
    items = [];

    props;

    constructor(elem, props) {
      super(elem, 'ul', TodosListProps$1.className);

      this.props = props;

      if(elem) {
        this.items = TodoItem$1.init(elem, {
          onTodoStatusChange: (item) => {
            this.updateItemDisplayMode(item);

            props?.onTodoStatusChange?.(item);
          }
        });

        this.itemTemplate = document
          .querySelector(`[${TodoItemProps$1.templateDataName}]`)
          ?.content
          ?.querySelector(`[${TodoItemProps$1.dataName}]`);
      }

      this.changeDisplayMode(TodosFooterProps$1.defaultDisplayListMode);
    }

    get displayMode() {
      return this.mode;
    }

    get itemsList() {
      return this.items;
    }

    addItem(title, completed) {
      const elem = this.itemTemplate?.cloneNode?.(true);

      const item = new TodoItem$1(elem, {
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
        this.elem.classList.remove(TodosListProps$1.hideClassName);
      } else {
        this.elem.classList.add(TodosListProps$1.hideClassName);
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
      if(this.mode === TodosListDisplayMode$1.All 
        || (this.mode === TodosListDisplayMode$1.Completed && item.checkbox?.checked)
        || (this.mode === TodosListDisplayMode$1.Active && !item.checkbox?.checked)
      ) {
        item.elem.classList.remove(TodoItemProps$1.hideClassName);  
      } else {
        item.elem.classList.add(TodoItemProps$1.hideClassName);
      }    
    }

    destroy() {
      for(let item of this.items) {
        item.destroy();
      }
    }

    static init(todosElem, props) {
      const elem = todosElem.querySelector(`[${TodosListProps$1.dataName}]`);

      if(elem) {
        return new TodosList$2(elem, props);
      } else {
        return null;
      }    
    }
  }

  todosList.TodosList = TodosList$2;
  todosList.TodosListProps = TodosListProps$1;

  const { TodosBase: TodosBase$1 } = todosBase;
  const { TodosHeader: TodosHeader$1 } = todosHeader;
  const { TodosFooter: TodosFooter$1 } = todosFooter;
  const { TodosList: TodosList$1 } = todosList;

  class TodosProps$1 {
    onCreateTodo;
    onDisplayChanged;

    onChangeDisplayMode;
    onClearCompleted;

    onTodoStatusChange;

    static className = 'todos';
    static dataName = 'data-todos';

    static containerClassName = TodosProps$1.className + '-container';

    static titleClassName = TodosProps$1.className + '-title';
    static titleDataName = TodosProps$1.dataName + '-title';
  }

  class Todos$1 extends TodosBase$1 {
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
      super(elem, 'div', TodosProps$1.className);

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
        this.title = elem.querySelector(`[${TodosProps$1.titleDataName}]`);
        
        this.header = TodosHeader$1.init(elem, {
          onCreateTodo: this.onCreateTodoHandler,
          onDisplayChanged: this.onDisplayChangedHandler
        });

        this.list = TodosList$1.init(elem, {
          onTodoStatusChange: this.onTodoStatusChangeHandler
        });

        this.footer = TodosFooter$1.init(elem, {
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
      this.title.classList.add(TodosProps$1.titleClassName);

      this.title.textContent = 'todos';

      this.elem.appendChild(this.title);
    }

    createContainer() {
      const container = document.createElement('div');

      container.classList.add(TodosProps$1.containerClassName);

      this.createHeader(container);
      this.createList(container);
      this.createFooter(container);

      this.elem.appendChild(container);
    }  

    createHeader(container) {
      this.header = new TodosHeader$1(null, {
        onCreateTodo: this.onCreateTodoHandler,
        onDisplayChanged: this.onDisplayChangedHandler
      });

      container.appendChild(this.header.elem);
    }

    createList(container) {
      this.list = new TodosList$1(null, {
        onTodoStatusChange: this.onTodoStatusChangeHandler
      });

      container.appendChild(this.list.elem);
    }

    createFooter(container) {
      this.footer = new TodosFooter$1(null, {
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
      const elems = document.querySelectorAll(`[${TodosProps$1.dataName}]`);

      const todosList = [];

      for(let elem of elems) {
        const todos = new Todos$1(elem, props);

        todosList.push(todos);
      }

      return todosList;
    }
  }

  todos$1.TodosProps = TodosProps$1;
  todos$1.Todos = Todos$1;

  const { TodosBase } = todosBase;
  const { TodosProps, Todos } = todos$1;
  const { TodoItemProps, TodoItem } = todoItem;
  const { TodosListDisplayMode, TodosFooterProps, TodosFooter } = todosFooter;
  const { TodosHeaderProps, TodosHeader } = todosHeader;
  const { TodosListProps, TodosList } = todosList;

  var todos = {
    TodosBase,
    TodosProps, Todos,
    TodoItemProps, TodoItem,
    TodosListDisplayMode, TodosFooterProps, TodosFooter,
    TodosHeaderProps, TodosHeader,
    TodosListProps, TodosList
  };

  const TodosModule = todos;


  if(window) {
    window.TodosModule = TodosModule;
  }

  return main;

})();
//# sourceMappingURL=todos-1.0.0.js.map
