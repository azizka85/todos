const { JSDOM } = require('jsdom');

const { TodosHeaderProps, TodosHeader } = require('../components/todos-header');

describe('TodosHeaderProps test', () => {
  test('Initial props should be correct', () => {
    expect(TodosHeaderProps.className).toEqual('todos-header');
    expect(TodosHeaderProps.dataName).toEqual('data-todos-header');

    expect(TodosHeaderProps.iconHideClassName).toEqual('todos-header-icon-hide');
    
    expect(TodosHeaderProps.inputDataName).toEqual('data-todos-header-input');
    expect(TodosHeaderProps.downIconDataName).toEqual('data-todos-header-down');
    expect(TodosHeaderProps.rightIconDataName).toEqual('data-todos-header-right');    
  });

  test('Handlers of props should work correctly', () => {
    const props = new TodosHeaderProps();

    props.onCreateTodo = (title) => {
      expect(title).toEqual('test');
    };

    props.onDisplayChanged = (display) => {
      expect(typeof display).toEqual('boolean');
    };

    props.onCreateTodo('test');
    props.onDisplayChanged(false);
  });
});

describe('TodosHeader test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });

  test('Should create new base component or from html element', () => {
    const baseComponent = new TodosHeader();

    expect(baseComponent['elem'].tagName.toLowerCase()).toEqual('div');
    expect(baseComponent['elem'].classList.length).toEqual(1);
    expect(baseComponent['elem'].className).toEqual(TodosHeaderProps.className);

    expect(baseComponent['elem'].children.length).toEqual(2);
    
    expect(baseComponent['elem'].children[0].tagName.toLowerCase()).toEqual('span');

    expect(baseComponent.downIconElem).toBeTruthy();
    expect(baseComponent.downIconElem).toBe(baseComponent['elem'].children[0].children[0]);
    expect(baseComponent.downIconElem.tagName.toLowerCase()).toEqual('svg');
    expect(baseComponent.downIconElem.hasAttribute(TodosHeaderProps.downIconDataName)).toBeTruthy();
    expect(baseComponent.downIconElem.classList.length).toEqual(0);

    expect(baseComponent.rightIconElem).toBeTruthy();
    expect(baseComponent.rightIconElem).toBe(baseComponent['elem'].children[0].children[1]);
    expect(baseComponent.rightIconElem.tagName.toLowerCase()).toEqual('svg');
    expect(baseComponent.rightIconElem.hasAttribute(TodosHeaderProps.rightIconDataName)).toBeTruthy();
    expect(baseComponent.rightIconElem.classList.length).toEqual(1);
    expect(baseComponent.rightIconElem.classList[0]).toEqual(TodosHeaderProps.iconHideClassName);

    expect(baseComponent['elem'].children[1].tagName.toLowerCase()).toEqual('input');

    expect(baseComponent.inputElem).toBeTruthy();    
    expect(baseComponent.inputElem).toBe(baseComponent['elem'].children[1]);
    expect(baseComponent.inputElem.tagName.toLowerCase()).toEqual('input');
    expect(baseComponent.inputElem.placeholder).toEqual('Enter new task');

    document.body.innerHTML = `
      <div>
        <table ${TodosHeaderProps.dataName}>
          <tr>
            <td ${TodosHeaderProps.downIconDataName}>Down</td>
            <td ${TodosHeaderProps.rightIconDataName}>Right</td>
            <td>
              <input ${TodosHeaderProps.inputDataName} placeholder="Anything else?">              
            </td>
          </tr>
        </table>      
      </div>
    `;

    expect(document.body.children.length).toEqual(1);

    const container = document.body.children[0];

    expect(container.tagName.toLowerCase()).toEqual('div');

    const todosHeader = TodosHeader.init(container);

    expect(todosHeader).toBeTruthy();
    expect(todosHeader['elem'].tagName.toLowerCase()).toEqual('table');
    expect(todosHeader['elem'].classList.length).toEqual(0);
    expect(todosHeader['elem'].hasAttribute(TodosHeaderProps.dataName)).toBeTruthy();

    expect(todosHeader.downIconElem).toBeTruthy();
    expect(todosHeader.downIconElem.tagName.toLowerCase()).toEqual('td');
    expect(todosHeader.downIconElem.hasAttribute(TodosHeaderProps.downIconDataName)).toBeTruthy();
    expect(todosHeader.downIconElem.classList.length).toEqual(0);
    expect(todosHeader.downIconElem.textContent).toContain('Down');

    expect(todosHeader.rightIconElem).toBeTruthy();
    expect(todosHeader.rightIconElem.tagName.toLowerCase()).toEqual('td');
    expect(todosHeader.rightIconElem.hasAttribute(TodosHeaderProps.rightIconDataName)).toBeTruthy();
    expect(todosHeader.rightIconElem.classList.length).toEqual(1);
    expect(todosHeader.rightIconElem.classList[0]).toEqual(TodosHeaderProps.iconHideClassName);
    expect(todosHeader.rightIconElem.textContent).toContain('Right');

    expect(todosHeader.inputElem).toBeTruthy();
    expect(todosHeader.inputElem.tagName.toLowerCase()).toEqual('input');
    expect(todosHeader.inputElem.hasAttribute(TodosHeaderProps.inputDataName)).toBeTruthy();
    expect(todosHeader.inputElem.placeholder).toContain('Anything else?');
  });

  test('Handlers should work correctly', () => {
    let displayCheck = false;
    let inputCheck = false;

    const baseComponent = new TodosHeader(null, {
      onCreateTodo(title) {
        inputCheck = title === baseComponent.inputElem.value.trim();
      },
      onDisplayChanged(display) {
        displayCheck = typeof display === 'boolean';
      }
    });   

    baseComponent.downIconElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    expect(baseComponent.downIconElem.classList.length).toEqual(1);
    expect(baseComponent.downIconElem.classList[0]).toEqual(TodosHeaderProps.iconHideClassName);
    expect(baseComponent.rightIconElem.classList.length).toEqual(0);

    displayCheck = false;

    baseComponent.rightIconElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    expect(baseComponent.downIconElem.classList.length).toEqual(0);
    expect(baseComponent.rightIconElem.classList.length).toEqual(1);
    expect(baseComponent.rightIconElem.classList[0]).toEqual(TodosHeaderProps.iconHideClassName);
    
    baseComponent.inputElem.value = 'Task #1';

    baseComponent.inputElem.dispatchEvent(
      new document.defaultView.KeyboardEvent('keyup', {
        key: 'Enter'
      })
    );

    expect(inputCheck).toBeTruthy();

    expect(baseComponent.inputElem.value).toBeFalsy();

    baseComponent.destroy();

    displayCheck = false;

    baseComponent.downIconElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeFalsy();

    expect(baseComponent.downIconElem.classList.length).toEqual(0);
    expect(baseComponent.rightIconElem.classList.length).toEqual(1);
    expect(baseComponent.rightIconElem.classList[0]).toEqual(TodosHeaderProps.iconHideClassName);

    baseComponent.inputElem.value = 'Task #2';

    inputCheck = false;

    baseComponent.inputElem.dispatchEvent(
      new document.defaultView.KeyboardEvent('keyup', {
        key: 'Enter'
      })
    );

    expect(inputCheck).toBeFalsy();

    expect(baseComponent.inputElem.value).toEqual('Task #2');

    document.body.innerHTML = `
      <div>
        <table ${TodosHeaderProps.dataName}>
          <tr>
            <td ${TodosHeaderProps.downIconDataName}>Down</td>
            <td ${TodosHeaderProps.rightIconDataName}>Right</td>
            <td ${TodosHeaderProps.inputDataName}>Anything else?</td>
          </tr>
        </table>      
      </div>
    `;
    
    displayCheck = false;
    inputCheck = false;

    const container = document.body.children[0];

    const todosHeader = TodosHeader.init(container, {
      onCreateTodo(title) {
        inputCheck = title === todosHeader.inputElem.value?.trim?.()
      },
      onDisplayChanged(display) {
        displayCheck = typeof display === 'boolean';
      }
    });

    todosHeader.downIconElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    expect(todosHeader.downIconElem.classList.length).toEqual(1);
    expect(todosHeader.downIconElem.classList[0]).toEqual(TodosHeaderProps.iconHideClassName);
    expect(todosHeader.rightIconElem.classList.length).toEqual(0);

    displayCheck = false;

    todosHeader.rightIconElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    expect(todosHeader.downIconElem.classList.length).toEqual(0);
    expect(todosHeader.rightIconElem.classList.length).toEqual(1);
    expect(todosHeader.rightIconElem.classList[0]).toEqual(TodosHeaderProps.iconHideClassName);
    
    todosHeader.inputElem.value = 'Task #1';

    todosHeader.inputElem.dispatchEvent(
      new document.defaultView.KeyboardEvent('keyup', {
        key: 'Enter'
      })
    );

    expect(inputCheck).toBeTruthy();

    expect(todosHeader.inputElem.value).toBeFalsy();

    todosHeader.destroy();

    displayCheck = false;

    todosHeader.downIconElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeFalsy();

    expect(todosHeader.downIconElem.classList.length).toEqual(0);
    expect(todosHeader.rightIconElem.classList.length).toEqual(1);
    expect(todosHeader.rightIconElem.classList[0]).toEqual(TodosHeaderProps.iconHideClassName);

    todosHeader.inputElem.value = 'Task #2';

    inputCheck = false;

    todosHeader.inputElem.dispatchEvent(
      new document.defaultView.KeyboardEvent('keyup', {
        key: 'Enter'
      })
    );

    expect(inputCheck).toBeFalsy();

    expect(todosHeader.inputElem.value).toEqual('Task #2');
  });
});