const { TodosBase } = require('./todos-base');

class TodosHeaderProps {
  onDisplayChanged;
  onCreateTodo;

  static className = 'todos-header';
  static dataName = 'data-todos-header';

  static iconHideClassName = TodosHeaderProps.className + '-icon-hide';

  static inputDataName = TodosHeaderProps.dataName + '-input';
  static downIconDataName = TodosHeaderProps.dataName + '-down';
  static rightIconDataName = TodosHeaderProps.dataName + '-right';
}

class TodosHeader extends TodosBase {  
  downIcon = null;
  rightIcon = null;
  input = null;

  downIconClickHandler;
  rightIconClickHandler;
  inputKeyUpHandler;

  constructor(elem, props) {
    super(elem, 'div', TodosHeaderProps.className);

    if(!elem) {
      this.createIcons();
      this.createInput();
    } else {
      this.downIcon = elem.querySelector(`[${TodosHeaderProps.downIconDataName}]`);
      this.rightIcon = elem.querySelector(`[${TodosHeaderProps.rightIconDataName}]`);
      this.input = elem.querySelector(`[${TodosHeaderProps.inputDataName}]`);
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
      <svg viewBox="0 0 16 16" ${TodosHeaderProps.downIconDataName}>
        <path
          fillRule="evenodd"
          d="
            M1.646 4.646a.5.5 0 0 1 .708 0L8 
            10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 
            6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z
          "
        />
      </svg>
      <svg viewBox="0 0 16 16" ${TodosHeaderProps.rightIconDataName}>
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

    this.downIcon = spanElem.querySelector(`[${TodosHeaderProps.downIconDataName}]`);
    this.rightIcon = spanElem.querySelector(`[${TodosHeaderProps.rightIconDataName}]`);

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
        this.rightIcon.classList.add(TodosHeaderProps.iconHideClassName);
      } else {
        this.rightIcon.classList.remove(TodosHeaderProps.iconHideClassName);
      }
    }
    if(this.downIcon) {
      if(value) {
        this.downIcon.classList.remove(TodosHeaderProps.iconHideClassName);
      } else {
        this.downIcon.classList.add(TodosHeaderProps.iconHideClassName);
      }
    }
  }

  destroy() {
    this.downIcon?.removeEventListener('click', this.downIconClickHandler);
    this.rightIcon?.removeEventListener('click', this.rightIconClickHandler);
    this.input?.removeEventListener('keyup', this.inputKeyUpHandler);
  }

  static init(todosElem, props) {
    const elem = todosElem.querySelector(`[${TodosHeaderProps.dataName}]`);

    if(elem) {
      return new TodosHeader(elem, props);
    } else {
      return null;
    }    
  }
}

exports.TodosHeaderProps = TodosHeaderProps;
exports.TodosHeader = TodosHeader;