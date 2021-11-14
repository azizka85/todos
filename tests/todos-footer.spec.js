const { JSDOM } = require('jsdom');

const { TodosListDisplayMode, TodosFooterProps, TodosFooter } = require('../components/todos-footer');

describe('TodosFooterProps test', () => {
  test('Initial props should be correct', () => {
    expect(TodosFooterProps.defaultDisplayListMode).toEqual(TodosListDisplayMode.All);

    expect(TodosFooterProps.className).toEqual('todos-footer');
    expect(TodosFooterProps.dataName).toEqual('data-todos-footer');

    expect(TodosFooterProps.infoClassName).toEqual('todos-footer-info');
    expect(TodosFooterProps.infoDataName).toEqual('data-todos-footer-info');

    expect(TodosFooterProps.buttonsClassName).toEqual('todos-footer-buttons');
    expect(TodosFooterProps.buttonClassName).toEqual('todos-footer-button');
    expect(TodosFooterProps.buttonActiveClassName).toEqual('todos-footer-button-active');

    expect(TodosFooterProps.displayAllBtnDataName).toEqual('data-todos-footer-display-all');
    expect(TodosFooterProps.displayActiveBtnDataName).toEqual('data-todos-footer-display-active');
    expect(TodosFooterProps.displayCompletedBtnDataName).toEqual('data-todos-footer-display-completed');
    expect(TodosFooterProps.clearCompletedBtnDataName).toEqual('data-todos-footer-clear-completed');
  });

  test('Handlers of props should work correctly', () => {
    const props = new TodosFooterProps();

    props.onChangeDisplayMode = (mode) => {
      expect(mode).toEqual(TodosListDisplayMode.All);
    };

    props.onClearCompleted = () => {
      expect(props).toBeTruthy();
    };

    props.onChangeDisplayMode(TodosListDisplayMode.All);
    props.onClearCompleted();
  });
});

describe('TodosFooter test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });

  test('Should create new base component or from html element', () => {
    const baseComponent = new TodosFooter();

    expect(baseComponent['elem'].tagName.toLowerCase()).toEqual('div');
    expect(baseComponent['elem'].classList.length).toEqual(1);
    expect(baseComponent['elem'].className).toEqual(TodosFooterProps.className);

    expect(baseComponent['elem'].children.length).toEqual(3);

    const infoContainer = baseComponent['elem'].children[0];

    expect(infoContainer.tagName.toLowerCase()).toEqual('div');
    expect(infoContainer.children.length).toEqual(1);
    expect(infoContainer.classList.length).toEqual(1);
    expect(infoContainer.className).toEqual(TodosFooterProps.infoClassName);
    expect(infoContainer.textContent).toEqual(' items left');    

    expect(baseComponent.infoElem).toBeTruthy();
    expect(baseComponent.infoElem).toBe(infoContainer.children[0]);
    expect(baseComponent.infoElem.tagName.toLowerCase()).toEqual('span');
    
    const buttons = baseComponent['elem'].children[1];

    expect(buttons.tagName.toLowerCase()).toEqual('div');
    expect(buttons.classList.length).toEqual(1);
    expect(buttons.className).toEqual(TodosFooterProps.buttonsClassName);
    expect(buttons.children.length).toEqual(3);

    expect(baseComponent.displayAllBtnElem).toBeTruthy();
    expect(baseComponent.displayAllBtnElem).toBe(buttons.children[0]);
    expect(baseComponent.displayAllBtnElem.tagName.toLowerCase()).toEqual('div');
    expect(baseComponent.displayAllBtnElem.classList.length).toEqual(2);
    expect(baseComponent.displayAllBtnElem.classList[0]).toEqual(TodosFooterProps.buttonClassName);
    expect(baseComponent.displayAllBtnElem.classList[1]).toEqual(TodosFooterProps.buttonActiveClassName);
    expect(baseComponent.displayAllBtnElem.textContent).toEqual('All');

    expect(baseComponent.displayActiveBtnElem).toBeTruthy();
    expect(baseComponent.displayActiveBtnElem).toBe(buttons.children[1]);
    expect(baseComponent.displayActiveBtnElem.tagName.toLowerCase()).toEqual('div');
    expect(baseComponent.displayActiveBtnElem.classList.length).toEqual(1);
    expect(baseComponent.displayActiveBtnElem.className).toEqual(TodosFooterProps.buttonClassName);
    expect(baseComponent.displayActiveBtnElem.textContent).toEqual('Active');

    expect(baseComponent.displayCompletedBtnElem).toBeTruthy();
    expect(baseComponent.displayCompletedBtnElem).toBe(buttons.children[2]);
    expect(baseComponent.displayCompletedBtnElem.tagName.toLowerCase()).toEqual('div');
    expect(baseComponent.displayCompletedBtnElem.classList.length).toEqual(1);
    expect(baseComponent.displayCompletedBtnElem.className).toEqual(TodosFooterProps.buttonClassName);
    expect(baseComponent.displayCompletedBtnElem.textContent).toEqual('Completed');

    expect(baseComponent.clearCompletedBtnElem).toBeTruthy();
    expect(baseComponent.clearCompletedBtnElem).toBe(baseComponent['elem'].children[2]);
    expect(baseComponent.clearCompletedBtnElem.tagName.toLowerCase()).toEqual('div');
    expect(baseComponent.clearCompletedBtnElem.classList.length).toEqual(2);
    expect(baseComponent.clearCompletedBtnElem.classList[0]).toEqual(TodosFooterProps.buttonClassName);
    expect(baseComponent.clearCompletedBtnElem.classList[1]).toEqual(TodosFooterProps.buttonActiveClassName);
    expect(baseComponent.clearCompletedBtnElem.textContent).toEqual('Clear completed');

    document.body.innerHTML = `
      <div>
        <table ${TodosFooterProps.dataName}>
          <tr>
            <td colspan="3" ${TodosFooterProps.infoDataName}>Info</td>
          </tr>
          <tr>
            <td ${TodosFooterProps.displayAllBtnDataName}>Display All</td>
            <td ${TodosFooterProps.displayActiveBtnDataName}>Display Active</td>
            <td ${TodosFooterProps.displayCompletedBtnDataName}>Display Completed</td>
          </tr>
          <tr>
            <td ${TodosFooterProps.clearCompletedBtnDataName}>Clear Completed</td>
          </tr>
        </table>
      </div>
    `;

    expect(document.body.children.length).toEqual(1);

    const container = document.body.children[0];

    expect(container.tagName.toLowerCase()).toEqual('div');

    const todosFooter = TodosFooter.init(container);

    expect(todosFooter).toBeTruthy();
    expect(todosFooter['elem'].tagName.toLowerCase()).toEqual('table');
    expect(todosFooter['elem'].classList.length).toEqual(0);
    expect(todosFooter['elem'].hasAttribute(TodosFooterProps.dataName)).toBeTruthy();

    expect(todosFooter.infoElem).toBeTruthy();
    expect(todosFooter.infoElem.tagName.toLowerCase()).toEqual('td');
    expect(todosFooter.infoElem.classList.length).toEqual(0);
    expect(todosFooter.infoElem.getAttribute('colspan')).toEqual('3');
    expect(todosFooter.infoElem.hasAttribute(TodosFooterProps.infoDataName)).toBeTruthy();
    expect(todosFooter.infoElem.textContent).toContain('Info');

    expect(todosFooter.displayAllBtnElem).toBeTruthy();
    expect(todosFooter.displayAllBtnElem.tagName.toLowerCase()).toEqual('td');    
    expect(todosFooter.displayAllBtnElem.classList.length).toEqual(1);
    expect(todosFooter.displayAllBtnElem.className).toEqual(TodosFooterProps.buttonActiveClassName);
    expect(todosFooter.displayAllBtnElem.hasAttribute(TodosFooterProps.displayAllBtnDataName)).toBeTruthy();
    expect(todosFooter.displayAllBtnElem.textContent).toContain('Display All');

    expect(todosFooter.displayActiveBtnElem).toBeTruthy();
    expect(todosFooter.displayActiveBtnElem.tagName.toLowerCase()).toEqual('td');
    expect(todosFooter.displayActiveBtnElem.classList.length).toEqual(0);
    expect(todosFooter.displayActiveBtnElem.hasAttribute(TodosFooterProps.displayActiveBtnDataName)).toBeTruthy();
    expect(todosFooter.displayActiveBtnElem.textContent).toContain('Display Active');

    expect(todosFooter.displayCompletedBtnElem).toBeTruthy();
    expect(todosFooter.displayCompletedBtnElem.tagName.toLowerCase()).toEqual('td');
    expect(todosFooter.displayCompletedBtnElem.classList.length).toEqual(0);
    expect(todosFooter.displayCompletedBtnElem.hasAttribute(TodosFooterProps.displayCompletedBtnDataName)).toBeTruthy();
    expect(todosFooter.displayCompletedBtnElem.textContent).toContain('Display Completed');

    expect(todosFooter.clearCompletedBtnElem).toBeTruthy();
    expect(todosFooter.clearCompletedBtnElem.tagName.toLowerCase()).toEqual('td');
    expect(todosFooter.clearCompletedBtnElem.classList.length).toEqual(0);
    expect(todosFooter.clearCompletedBtnElem.hasAttribute(TodosFooterProps.clearCompletedBtnDataName)).toBeTruthy();
    expect(todosFooter.clearCompletedBtnElem.textContent).toContain('Clear Completed');
  });

  test('Handlers should work correctly', () => {
    let clearCheck = false;
    let displayCheck = false;

    const baseComponent = new TodosFooter(null, {
      onChangeDisplayMode(mode) {
        displayCheck = typeof mode === 'string';
      },
      onClearCompleted() {
        clearCheck = true;
      }
    });

    expect(displayCheck).toBeFalsy();    

    baseComponent.displayActiveBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();
    
    expect(baseComponent.displayAllBtnElem.classList.length).toEqual(1);
    expect(baseComponent.displayAllBtnElem.className).toEqual(TodosFooterProps.buttonClassName);

    expect(baseComponent.displayActiveBtnElem.classList.length).toEqual(2);
    expect(baseComponent.displayActiveBtnElem.classList[0]).toEqual(TodosFooterProps.buttonClassName);
    expect(baseComponent.displayActiveBtnElem.classList[1]).toEqual(TodosFooterProps.buttonActiveClassName);

    expect(baseComponent.displayCompletedBtnElem.classList.length).toEqual(1);
    expect(baseComponent.displayCompletedBtnElem.className).toEqual(TodosFooterProps.buttonClassName);

    displayCheck = false;

    baseComponent.displayCompletedBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    expect(baseComponent.displayAllBtnElem.classList.length).toEqual(1);
    expect(baseComponent.displayAllBtnElem.className).toEqual(TodosFooterProps.buttonClassName);

    expect(baseComponent.displayActiveBtnElem.classList.length).toEqual(1);
    expect(baseComponent.displayActiveBtnElem.className).toEqual(TodosFooterProps.buttonClassName);

    expect(baseComponent.displayCompletedBtnElem.classList.length).toEqual(2);
    expect(baseComponent.displayCompletedBtnElem.classList[0]).toEqual(TodosFooterProps.buttonClassName);
    expect(baseComponent.displayCompletedBtnElem.classList[1]).toEqual(TodosFooterProps.buttonActiveClassName);    

    displayCheck = false;

    baseComponent.displayAllBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    expect(baseComponent.displayAllBtnElem.classList.length).toEqual(2);
    expect(baseComponent.displayAllBtnElem.classList[0]).toEqual(TodosFooterProps.buttonClassName);
    expect(baseComponent.displayAllBtnElem.classList[1]).toEqual(TodosFooterProps.buttonActiveClassName);      

    expect(baseComponent.displayActiveBtnElem.classList.length).toEqual(1);
    expect(baseComponent.displayActiveBtnElem.className).toEqual(TodosFooterProps.buttonClassName);

    expect(baseComponent.displayCompletedBtnElem.classList.length).toEqual(1);
    expect(baseComponent.displayCompletedBtnElem.className).toEqual(TodosFooterProps.buttonClassName);    

    expect(clearCheck).toBeFalsy();

    baseComponent.clearCompletedBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(clearCheck).toBeTruthy();

    baseComponent.destroy();

    displayCheck = false;

    baseComponent.displayActiveBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeFalsy();  

    clearCheck = false;

    baseComponent.clearCompletedBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(clearCheck).toBeFalsy();

    document.body.innerHTML = `
      <div>
        <table ${TodosFooterProps.dataName}>
          <tr>
            <td colspan="3" ${TodosFooterProps.infoDataName}>Info</td>
          </tr>
          <tr>
            <td ${TodosFooterProps.displayAllBtnDataName}>Display All</td>
            <td ${TodosFooterProps.displayActiveBtnDataName}>Display Active</td>
            <td ${TodosFooterProps.displayCompletedBtnDataName}>Display Completed</td>
          </tr>
          <tr>
            <td ${TodosFooterProps.clearCompletedBtnDataName}>Clear Completed</td>
          </tr>
        </table>
      </div>
    `;

    const container = document.body.children[0];

    displayCheck = false;
    clearCheck = false;

    const todosFooter = TodosFooter.init(container, {
      onChangeDisplayMode(mode) {
        displayCheck = typeof mode === 'string';
      },
      onClearCompleted() {
        clearCheck = true;
      }
    });

    expect(displayCheck).toBeFalsy();    

    todosFooter.displayActiveBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();
    
    expect(todosFooter.displayAllBtnElem.classList.length).toEqual(0);

    expect(todosFooter.displayActiveBtnElem.classList.length).toEqual(1);
    expect(todosFooter.displayActiveBtnElem.className).toEqual(TodosFooterProps.buttonActiveClassName);

    expect(todosFooter.displayCompletedBtnElem.classList.length).toEqual(0);

    displayCheck = false;

    todosFooter.displayCompletedBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    expect(todosFooter.displayAllBtnElem.classList.length).toEqual(0);

    expect(todosFooter.displayActiveBtnElem.classList.length).toEqual(0);

    expect(todosFooter.displayCompletedBtnElem.classList.length).toEqual(1);
    expect(todosFooter.displayCompletedBtnElem.className).toEqual(TodosFooterProps.buttonActiveClassName);    

    displayCheck = false;

    todosFooter.displayAllBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeTruthy();

    expect(todosFooter.displayAllBtnElem.classList.length).toEqual(1);
    expect(todosFooter.displayAllBtnElem.className).toEqual(TodosFooterProps.buttonActiveClassName);      

    expect(todosFooter.displayActiveBtnElem.classList.length).toEqual(0);

    expect(todosFooter.displayCompletedBtnElem.classList.length).toEqual(0);

    expect(clearCheck).toBeFalsy();

    todosFooter.clearCompletedBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(clearCheck).toBeTruthy();

    todosFooter.destroy();

    displayCheck = false;

    todosFooter.displayActiveBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(displayCheck).toBeFalsy();

    clearCheck = false;

    todosFooter.clearCompletedBtnElem.dispatchEvent(
      new document.defaultView.MouseEvent('click')
    );

    expect(clearCheck).toBeFalsy();
  });
});