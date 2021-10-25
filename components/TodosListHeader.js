import TodosBase from './TodosBase';
import TodosGlobals from '../TodosGlobals';

export default class TodosListHeader extends TodosBase {
  _iconRight = null;
  _iconDown = null;
  _input = null;

  _display = true;

  _props = null;

  constructor(elem, props) {
    super(elem, 'li', TodosGlobals.todosListHeaderClassName);

    this._props = props;

    if(!elem) {
      this._createIcons();
      this._createInput();
    } else {
      this._iconDown = elem.querySelector(`[${TodosGlobals.todosListHeaderExpanderDownIconDataName}]`);
      this._iconRight = elem.querySelector(`[${TodosGlobals.todosListHeaderExpanderRightIconDataName}]`);
      this._input = elem.querySelector(`[${TodosGlobals.todosListHeaderInputDataName}]`);
    }

    const cmp = this;

    if(this._iconRight) {
      this._iconRight.addEventListener('click', () => cmp.display = true);
    }

    if(this._iconDown) {
      this._iconDown.addEventListener('click', () => cmp.display = false);
    }

    if(this._input) {
      this._input.addEventListener('keyup', (event) => {
        const title = event.target.value.trim();

        if(event.key === 'Enter' && title) {
          props?.onCreateTodo?.(title);

          event.target.value = '';
        }
      })
    }

    this._changeDisplay();
  }

  get display() {
    return this._display;
  }

  set display(value) {
    if(this._display !== value) {
      this._display = value;

      this._changeDisplay();

      this._props?.onDisplayChanged?.();
    }
  }

  get iconRight() {
    return this._iconRight;
  }

  get iconDown() {
    return this._iconDown;
  }

  get input() {
    return this._input;
  }

  _createIcons() {
    const spanElem = document.createElement('span');

    spanElem.innerHTML = `
      <svg viewBox="0 0 16 16" ${TodosGlobals.todosListHeaderExpanderDownIconDataName}>
        <path
          fillRule="evenodd"
          d="
            M1.646 4.646a.5.5 0 0 1 .708 0L8 
            10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 
            6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z
          "
        />
      </svg>
      <svg viewBox="0 0 16 16" ${TodosGlobals.todosListHeaderExpanderRightIconDataName}>
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

    this._iconDown = spanElem.querySelector(`[${TodosGlobals.todosListHeaderExpanderDownIconDataName}]`);
    this._iconRight = spanElem.querySelector(`[${TodosGlobals.todosListHeaderExpanderRightIconDataName}]`);

    this.component.appendChild(spanElem);
  }

  _createInput() {
    this._input = document.createElement('input');

    this.component.appendChild(this._input);
  }

  _changeDisplay() {
    if(this._iconRight) {
      this._iconRight.style.display = this._display ? 'none' : '';
    }
    if(this._iconDown) {
      this._iconDown.style.display = !this._display ? 'none' : '';
    }
  }

  static init(todosListElem, props) {
    const elem = todosListElem.querySelector(`[${TodosGlobals.todosListHeaderDataName}]`);

    if(elem) {
      return new TodosListHeader(elem, props);
    } else {
      return null;
    }    
  }
}