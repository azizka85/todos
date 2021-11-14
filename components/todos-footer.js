const { TodosBase } = require('./todos-base');

const TodosListDisplayMode = {
  All: 'all', 
  Active: 'active',
  Completed: 'completed'
};

class TodosFooterProps {
  onChangeDisplayMode;
  onClearCompleted;

  static defaultDisplayListMode = TodosListDisplayMode.All;

  static className = 'todos-footer';
  static dataName = 'data-todos-footer';

  static infoClassName = TodosFooterProps.className + '-info';
  static infoDataName = TodosFooterProps.dataName + '-info';

  static buttonsClassName = TodosFooterProps.className + '-buttons';
  static buttonClassName = TodosFooterProps.className + '-button';
  static buttonActiveClassName = TodosFooterProps.buttonClassName + '-active';

  static displayAllBtnDataName = TodosFooterProps.dataName + '-display-all';
  static displayActiveBtnDataName = TodosFooterProps.dataName + '-display-active';
  static displayCompletedBtnDataName = TodosFooterProps.dataName + '-display-completed';
  static clearCompletedBtnDataName = TodosFooterProps.dataName + '-clear-completed';
}

class TodosFooter extends TodosBase {
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
    super(elem, 'div', TodosFooterProps.className);

    if(!elem) {
      this.createInfo();
      this.createButtons();
      this.createClearCompletedBtn();
    } else {
      this.info = elem.querySelector(`[${TodosFooterProps.infoDataName}]`);
      this.displayAllBtn = elem.querySelector(`[${TodosFooterProps.displayAllBtnDataName}]`);
      this.displayActiveBtn = elem.querySelector(`[${TodosFooterProps.displayActiveBtnDataName}]`);
      this.displayCompletedBtn = elem.querySelector(`[${TodosFooterProps.displayCompletedBtnDataName}]`);
      this.clearCompletedBtn = elem.querySelector(`[${TodosFooterProps.clearCompletedBtnDataName}]`);
    }

    if(this.displayAllBtn) {
      this.displayAllBtnClickHandler = () => {
        this.changeDisplayMode(TodosListDisplayMode.All);

        props?.onChangeDisplayMode?.(TodosListDisplayMode.All);
      };
      this.displayAllBtn.addEventListener('click', this.displayAllBtnClickHandler);
    }

    if(this.displayActiveBtn) {
      this.displayActiveBtnClickHandler = () => {
        this.changeDisplayMode(TodosListDisplayMode.Active);

        props?.onChangeDisplayMode?.(TodosListDisplayMode.Active);
      };
      this.displayActiveBtn.addEventListener('click', this.displayActiveBtnClickHandler);
    }

    if(this.displayCompletedBtn) {
      this.displayCompletedBtnClickHandler = () => {
        this.changeDisplayMode(TodosListDisplayMode.Completed);

        props?.onChangeDisplayMode?.(TodosListDisplayMode.Completed);
      };
      this.displayCompletedBtn.addEventListener('click', this.displayCompletedBtnClickHandler);
    }

    if(this.clearCompletedBtn) {
      this.clearCompletedBtnClickHandler = () => props?.onClearCompleted?.();
      this.clearCompletedBtn.addEventListener('click', this.clearCompletedBtnClickHandler);
    }

    this.changeDisplayMode(TodosFooterProps.defaultDisplayListMode);
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

    elem.classList.add(TodosFooterProps.infoClassName);
    elem.innerHTML = '<span></span> items left';

    this.info = elem.querySelector('span');

    this.elem.appendChild(elem);
  }

  createButtons() {
    const elem = document.createElement('div');

    elem.classList.add(TodosFooterProps.buttonsClassName);

    this.displayAllBtn = document.createElement('div');
    this.displayAllBtn.classList.add(TodosFooterProps.buttonClassName);
    this.displayAllBtn.textContent = 'All';

    this.displayActiveBtn = document.createElement('div');
    this.displayActiveBtn.classList.add(TodosFooterProps.buttonClassName);
    this.displayActiveBtn.textContent = 'Active';

    this.displayCompletedBtn = document.createElement('div');
    this.displayCompletedBtn.classList.add(TodosFooterProps.buttonClassName);
    this.displayCompletedBtn.textContent = 'Completed';

    elem.appendChild(this.displayAllBtn);
    elem.appendChild(this.displayActiveBtn);
    elem.appendChild(this.displayCompletedBtn);

    this.elem.appendChild(elem);
  }

  createClearCompletedBtn() {
    this.clearCompletedBtn = document.createElement('div');

    this.clearCompletedBtn.classList.add(TodosFooterProps.buttonClassName);
    this.clearCompletedBtn.classList.add(TodosFooterProps.buttonActiveClassName);
    this.clearCompletedBtn.textContent = 'Clear completed';

    this.elem.appendChild(this.clearCompletedBtn);
  }

  changeDisplayMode(mode) {
    if(mode === TodosListDisplayMode.All) {
      this.displayAllBtn?.classList.add(TodosFooterProps.buttonActiveClassName);
    } else {
      this.displayAllBtn?.classList.remove(TodosFooterProps.buttonActiveClassName);
    }

    if(mode === TodosListDisplayMode.Active) {
      this.displayActiveBtn?.classList.add(TodosFooterProps.buttonActiveClassName);
    } else {
      this.displayActiveBtn?.classList.remove(TodosFooterProps.buttonActiveClassName);
    }

    if(mode === TodosListDisplayMode.Completed) {
      this.displayCompletedBtn?.classList.add(TodosFooterProps.buttonActiveClassName);
    } else {
      this.displayCompletedBtn?.classList.remove(TodosFooterProps.buttonActiveClassName);
    }
  }

  destroy() {
    this.displayAllBtn?.removeEventListener('click', this.displayAllBtnClickHandler);
    this.displayActiveBtn?.removeEventListener('click', this.displayActiveBtnClickHandler);
    this.displayCompletedBtn?.removeEventListener('click', this.displayCompletedBtnClickHandler);
    this.clearCompletedBtn?.removeEventListener('click', this.clearCompletedBtnClickHandler);
  }

  static init(todosElem, props) {
    const elem = todosElem.querySelector(`[${TodosFooterProps.dataName}]`);

    if(elem) {
      return new TodosFooter(elem, props);
    } else {
      return null;
    }
  }
}

exports.TodosListDisplayMode = TodosListDisplayMode;
exports.TodosFooterProps = TodosFooterProps;
exports.TodosFooter = TodosFooter;