const { JSDOM } = require('jsdom');

const { TodosProps, Todos } = require('../components/todos');
const { TodosListDisplayMode, TodosFooterProps } = require('../components/todos-footer');
const { TodosHeaderProps } = require('../components/todos-header');
const { TodoItem } = require('../components/todo-item');
const { TodosListProps } = require('../components/todos-list');

describe('TodosProps test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });

  test('Initial props should be correct', () => {
    expect(TodosProps.className).toEqual('todos');
    expect(TodosProps.dataName).toEqual('data-todos');

    expect(TodosProps.containerClassName).toEqual('todos-container');
    
    expect(TodosProps.titleClassName).toEqual('todos-title');
    expect(TodosProps.titleDataName).toEqual('data-todos-title');
  });

  test('Handlers of props should work correctly', () => {
    const props = new TodosProps();

    props.onCreateTodo = (title) => {
      expect(title).toEqual('test');
    };

    props.onDisplayChanged = (display) => {
      expect(typeof display).toEqual('boolean');
    };

    props.onChangeDisplayMode = (mode) => {
      expect(mode).toEqual(TodosListDisplayMode.Active);
    };

    props.onClearCompleted = () => {
      expect(props).toBeTruthy();
    };

    props.onTodoStatusChange = (item) => {
      expect(item).toBeInstanceOf(TodoItem);
    };

    props.onCreateTodo('test');
    props.onDisplayChanged(false);
    props.onChangeDisplayMode(TodosListDisplayMode.Active);
    props.onClearCompleted();
    props.onTodoStatusChange(new TodoItem());
  });
});

describe('Todos test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });

  test('Should create new base component or from html element', () => {
    const baseComponent = new Todos();

    expect(baseComponent['elem'].tagName.toLowerCase()).toEqual('div');
    expect(baseComponent['elem'].classList.length).toEqual(1);
    expect(baseComponent['elem'].className).toEqual(TodosProps.className);

    expect(baseComponent['elem'].children.length).toEqual(2);

    expect(baseComponent['elem'].children[0]).toBe(baseComponent.titleElem);
    expect(baseComponent.titleElem.tagName.toLowerCase()).toEqual('div');
    expect(baseComponent.titleElem.classList.length).toEqual(1);
    expect(baseComponent.titleElem.className).toEqual(TodosProps.titleClassName);
    expect(baseComponent.titleElem.textContent).toContain('todos');

    const container = baseComponent['elem'].children[1];

    expect(container.tagName.toLowerCase()).toEqual('div');
    expect(container.classList.length).toEqual(1);
    expect(container.classList[0]).toEqual(TodosProps.containerClassName);

    expect(container.children[0]).toBe(baseComponent.headerComponent['elem']);
    expect(container.children[1]).toBe(baseComponent.listComponent['elem']);
    expect(container.children[2]).toBe(baseComponent.footerComponent['elem']);

    document.body.innerHTML = `
      <table ${TodosProps.dataName}>
        <tr ${TodosProps.titleDataName}>
          <td>Tasks</td>
        </tr>
        <tr ${TodosHeaderProps.dataName}>
          <td>Todos Header</td>
        </tr>
        <tr ${TodosListProps.dataName}>
          <td>Todos List</td>
        </tr>
        <tr ${TodosFooterProps.dataName}>
          <td>Todos Footer</td>
        </tr>
      </table>
      <span ${TodosProps.dataName}></span>
    `;

    const todosList = Todos.init();

    expect(todosList.length).toEqual(2);

    expect(todosList[0]['elem'].tagName.toLowerCase()).toEqual('table');
    expect(todosList[0]['elem'].classList.length).toEqual(0);
    expect(todosList[0]['elem'].hasAttribute(TodosProps.dataName)).toBeTruthy();

    expect(todosList[0].titleElem.tagName.toLowerCase()).toEqual('tr');
    expect(todosList[0].titleElem.hasAttribute(TodosProps.titleDataName)).toBeTruthy();
    expect(todosList[0].titleElem.classList.length).toEqual(0);
    expect(todosList[0].titleElem.textContent).toContain('Tasks');

    expect(todosList[0].headerComponent['elem'].tagName.toLowerCase()).toEqual('tr');
    expect(todosList[0].headerComponent['elem'].hasAttribute(TodosHeaderProps.dataName)).toBeTruthy();
    expect(todosList[0].headerComponent['elem'].classList.length).toEqual(0);
    expect(todosList[0].headerComponent['elem'].textContent).toContain('Todos Header');

    expect(todosList[0].listComponent['elem'].tagName.toLowerCase()).toEqual('tr');
    expect(todosList[0].listComponent['elem'].hasAttribute(TodosListProps.dataName)).toBeTruthy();
    expect(todosList[0].listComponent['elem'].classList.length).toEqual(0);
    expect(todosList[0].listComponent['elem'].textContent).toContain('Todos List');

    expect(todosList[0].footerComponent['elem'].tagName.toLowerCase()).toEqual('tr');
    expect(todosList[0].footerComponent['elem'].hasAttribute(TodosFooterProps.dataName)).toBeTruthy();
    expect(todosList[0].footerComponent['elem'].classList.length).toEqual(0);
    expect(todosList[0].footerComponent['elem'].textContent).toContain('Todos Footer');

    expect(todosList[1]['elem'].tagName.toLowerCase()).toEqual('span');
    expect(todosList[1]['elem'].classList.length).toEqual(0);
    expect(todosList[1]['elem'].hasAttribute(TodosProps.dataName)).toBeTruthy();

    expect(todosList[1].titleElem).toBeFalsy();
    expect(todosList[1].headerComponent).toBeFalsy();
    expect(todosList[1].listComponent).toBeFalsy();
    expect(todosList[1].footerComponent).toBeFalsy();
  });

  test('Handlers should work correctly', () => {
    let displayCheck = false;
    let inputCheck = false;

    let displayModeCheck = false;
    let clearCompletedCheck = false;

    let statusCheck = false;

    const todos = new Todos(null, {
      onCreateTodo(title) {
        inputCheck = title === todos.headerComponent.inputElem.value.trim();
      },
      onDisplayChanged(display) {
        displayCheck = typeof display === 'boolean';
      },
      onChangeDisplayMode(mode) {
        displayModeCheck = typeof mode === 'string';
      },
      onClearCompleted() {
        clearCompletedCheck = true;
      },
      onTodoStatusChange(item) {
        statusCheck = item instanceof TodoItem;
      }
    });

    todos.listComponent.addItem('Task #1', false);

    const todoItem = todos.listComponent.itemsList[0];    

    expect(displayCheck).toBeFalsy();

    todos.headerComponent.downIconElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    displayCheck = false;

    todos.headerComponent.rightIconElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    expect(inputCheck).toBeFalsy();

    todos.headerComponent.inputElem.value = 'Task #1';

    todos.headerComponent.inputElem.dispatchEvent(
      new document.defaultView.KeyboardEvent('keyup', {
        key: 'Enter'
      })
    );

    expect(inputCheck).toBeTruthy();

    expect(displayModeCheck).toBeFalsy();

    todos.footerComponent.displayActiveBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayModeCheck).toBeTruthy();

    displayModeCheck = false;

    todos.footerComponent.displayCompletedBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayModeCheck).toBeTruthy();

    displayModeCheck = false;

    todos.footerComponent.displayAllBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayModeCheck).toBeTruthy();

    expect(clearCompletedCheck).toBeFalsy();

    todos.footerComponent.clearCompletedBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(clearCompletedCheck).toBeTruthy();    

    expect(statusCheck).toBeFalsy();
    expect(todoItem.checkboxElem.checked).toBeFalsy();

    todoItem.checkboxElem.checked = true;
    
    todoItem.checkboxElem.dispatchEvent(
      new document.defaultView.Event('change')
    );

    expect(statusCheck).toBeTruthy();
    expect(todoItem.checkboxElem.checked).toBeTruthy();

    todos.destroy();

    displayCheck = false;

    todos.headerComponent.downIconElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeFalsy();

    inputCheck = false;

    todos.headerComponent.inputElem.value = 'Task #2';
    
    todos.headerComponent.inputElem.dispatchEvent(
      new document.defaultView.KeyboardEvent('keyup', {
        key: 'Enter'
      })
    );

    expect(inputCheck).toBeFalsy();

    displayModeCheck = false;

    todos.footerComponent.displayActiveBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayModeCheck).toBeFalsy();

    clearCompletedCheck = false;

    todos.footerComponent.clearCompletedBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(clearCompletedCheck).toBeFalsy();

    statusCheck = false;

    todoItem.checkboxElem.dispatchEvent(
      new document.defaultView.Event('change')
    );

    expect(statusCheck).toBeFalsy();
  });
});