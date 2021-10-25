import TodosBase from './TodosBase';
import TodosGlobals from '../TodosGlobals';

export const TodosListDisplayMode = {
  All: 'all', 
  Active: 'active',
  Completed: 'completed'
};

export default class TodosListFooter extends TodosBase {
  _container = null;
  _displayAllBtn = null;
  _displayActiveBtn = null;
  _displayCompletedBtn = null;
  _clearCompletedBtn = null;
  
  constructor(elem, props) {
    super(elem, 'li', TodosGlobals.todosListFooterClassName);    

    if(!elem) {
      this._createContainer();
      this._createButtons();
      this._createClearCompletedBtn();
    } else {
      this._container = elem.querySelector(`[${TodosGlobals.todosListFooterContainerDataName}]`);
      this._displayAllBtn = elem.querySelector(`[${TodosGlobals.todosListFooterDisplayAllButtonDataName}]`);
      this._displayActiveBtn = elem.querySelector(`[${TodosGlobals.todosListFooterDisplayActiveButtonDataName}]`);
      this._displayCompletedBtn = elem.querySelector(`[${TodosGlobals.todosListFooterDisplayCompletedButtonDataName}]`);
      this._clearCompletedBtn = elem.querySelector(`[${TodosGlobals.todosListFooterClearCompletedButtonDataName}]`);
    }

    if(this._displayAllBtn) {
      this._displayAllBtn.addEventListener('click', () => props?.onChangeDisplayMode?.(TodosListDisplayMode.All));
    }
    if(this._displayActiveBtn) {
      this._displayActiveBtn.addEventListener('click', () => props?.onChangeDisplayMode?.(TodosListDisplayMode.Active));
    }
    if(this._displayCompletedBtn) {
      this._displayCompletedBtn.addEventListener('click', () => props?.onChangeDisplayMode?.(TodosListDisplayMode.Completed));
    }
    if(this._clearCompletedBtn) {
      this._clearCompletedBtn.addEventListener('click', () => props?.onClearCompleted?.());
    }
  }

  get container() {
    return this._container;
  }

  get displayAllBtn() {
    return this._displayAllBtn;
  }

  get displayActiveBtn() {
    return this._displayActiveBtn;
  }

  get displayCompletedBtn() {
    return this._displayCompletedBtn;
  }

  get clearCompletedBtn() {
    return this._clearCompletedBtn;
  }

  _createContainer() {
    const elem = document.createElement('div');
    elem.classList.add(TodosGlobals.todosListFooterContainerClassName);
    elem.innerHTML = `<span ${TodosGlobals.todosListFooterContainerDataName}></span> items left`;

    this._container = elem.querySelector(`[${TodosGlobals.todosListFooterContainerDataName}]`);

    this.component.appendChild(elem);
  }

  _createButtons() {
    const elem = document.createElement('div');
    elem.classList.add(TodosGlobals.todosListFooterButtonsClassName);

    this._displayAllBtn = document.createElement('div');
    this._displayAllBtn.classList.add(TodosGlobals.todosListFooterButtonClassName);
    this._displayAllBtn.textContent = 'All'; 
    
    this._displayActiveBtn = document.createElement('div');
    this._displayActiveBtn.classList.add(TodosGlobals.todosListFooterButtonClassName);
    this._displayActiveBtn.textContent = 'Active';

    this._displayCompletedBtn = document.createElement('div');
    this._displayCompletedBtn.classList.add(TodosGlobals.todosListFooterButtonClassName);
    this._displayCompletedBtn.textContent = 'Completed';

    elem.appendChild(this._displayAllBtn);
    elem.appendChild(this._displayActiveBtn);
    elem.appendChild(this._displayCompletedBtn);

    this.component.appendChild(elem);
  }

  _createClearCompletedBtn() {
    this._clearCompletedBtn = document.createElement('div');
    this._clearCompletedBtn.classList.add(TodosGlobals.todosListFooterButtonClassName);
    this._clearCompletedBtn.textContent = 'Clear completed';

    this.component.appendChild(this._clearCompletedBtn);
  }

  static init(todosListElem, props) {
    const elem = todosListElem.querySelector(`[${TodosGlobals.todosListFooterDataName}]`);

    if(elem) {
      return new TodosListFooter(elem, props);
    } else {
      return null;
    }    
  }
}