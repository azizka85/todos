const { JSDOM } = require('jsdom');

const { TodoItemProps, TodoItem } = require('../components/todo-item');

describe('TodoItemProps test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });

  test('Initial props should be correct', () => {
    expect(TodoItemProps.className).toEqual('todo-item');
    expect(TodoItemProps.dataName).toEqual('data-todo-item');

    expect(TodoItemProps.checkedClassName).toEqual('todo-item-checked');
    expect(TodoItemProps.hideClassName).toEqual('todo-item-hide');

    expect(TodoItemProps.checkboxDataName).toEqual('data-todo-item-checkbox');
    expect(TodoItemProps.contentDataName).toEqual('data-todo-item-content');
    expect(TodoItemProps.templateDataName).toEqual('data-todo-item-template');
  });

  test('Handlers of props should work correctly', () => {
    const props = new TodoItemProps();

    props.onTodoStatusChange = (item) => {
      expect(item).toBeInstanceOf(TodoItem);
      expect(item.checkboxElem.checked).toBeTruthy();
      expect(item.contentElem.textContent).toEqual('Task #1');
    };

    props.onTodoStatusChange(new TodoItem(null, {
      completed: true,
      title: 'Task #1'
    }));
  });
});

describe('TodoItem test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });

  test('Should create new base component or from html element', () => {
    const baseComponent = new TodoItem(null, {
      completed: true,
      title: 'Task #1'
    });

    expect(baseComponent['elem'].tagName.toLowerCase()).toEqual('li');
    expect(baseComponent['elem'].classList.length).toEqual(2);
    expect(baseComponent['elem'].classList[0]).toEqual(TodoItemProps.className);
    expect(baseComponent['elem'].classList[1]).toEqual(TodoItemProps.checkedClassName);

    expect(baseComponent['elem'].children.length).toEqual(2);

    const checkboxContainer = baseComponent['elem'].children[0];

    expect(checkboxContainer.tagName.toLowerCase()).toEqual('label');
    expect(checkboxContainer.children.length).toEqual(2);

    expect(baseComponent.checkboxElem).toBeTruthy();
    expect(baseComponent.checkboxElem.tagName.toLowerCase()).toEqual('input');
    expect(baseComponent.checkboxElem).toBe(checkboxContainer.children[0]);
    expect(baseComponent.checkboxElem.checked).toBeTruthy();

    expect(checkboxContainer.children[1].tagName.toLowerCase()).toEqual('span');
    
    expect(baseComponent.contentElem).toBeTruthy();
    expect(baseComponent.contentElem.tagName.toLowerCase()).toEqual('span');
    expect(baseComponent.contentElem).toBe(baseComponent['elem'].children[1]);
    expect(baseComponent.contentElem.textContent).toEqual('Task #1');

    document.body.innerHTML = `
      <table>
        <tr ${TodoItemProps.dataName}>
          <td ${TodoItemProps.checkboxDataName}>Checkbox</td>
          <td ${TodoItemProps.contentDataName}>Content</td>
        </tr>
        <tr ${TodoItemProps.dataName}>
          <td colspan="2">Something else...</td>
        </tr>
      </table>
    `;

    expect(document.body.children.length).toEqual(1);

    const container = document.body.children[0];

    expect(container.tagName.toLowerCase()).toEqual('table');

    const items = TodoItem.init(container, {
      completed: true,
      title: 'Task #2'
    });

    expect(items.length).toEqual(2);

    expect(items[0]['elem'].tagName.toLowerCase()).toEqual('tr');
    expect(items[0]['elem'].hasAttribute(TodoItemProps.dataName)).toBeTruthy();
    
    expect(items[0].checkboxElem).toBeTruthy();
    expect(items[0].checkboxElem.tagName.toLowerCase()).toEqual('td');
    expect(items[0].checkboxElem.hasAttribute(TodoItemProps.checkboxDataName)).toBeTruthy();
    expect(items[0].checkboxElem.checked).toBeTruthy();

    expect(items[0].contentElem).toBeTruthy();
    expect(items[0].contentElem.tagName.toLowerCase()).toEqual('td');
    expect(items[0].contentElem.hasAttribute(TodoItemProps.contentDataName)).toBeTruthy();
    expect(items[0].contentElem.textContent).toEqual('Task #2');

    expect(items[1]['elem'].tagName.toLowerCase()).toEqual('tr');
    expect(items[1].checkboxElem).toBeFalsy();
    expect(items[1].contentElem).toBeFalsy();
  });

  test('Handlers should work correctly', () => {
    let statusCheck = false;

    const baseComponent = new TodoItem(null, {
      onTodoStatusChange(item) {
        statusCheck = item instanceof TodoItem;
      }
    });

    expect(statusCheck).toBeFalsy();
    expect(baseComponent.checkboxElem.checked).toBeFalsy();

    expect(baseComponent['elem'].classList.length).toEqual(1);
    expect(baseComponent['elem'].className).toEqual(TodoItemProps.className);

    baseComponent.checkboxElem.checked = true;

    baseComponent.checkboxElem.dispatchEvent(new document.defaultView.Event('change'));

    expect(statusCheck).toBeTruthy();
    expect(baseComponent.checkboxElem.checked).toBeTruthy();

    expect(baseComponent['elem'].classList.length).toEqual(2);
    expect(baseComponent['elem'].classList[0]).toEqual(TodoItemProps.className);
    expect(baseComponent['elem'].classList[1]).toEqual(TodoItemProps.checkedClassName);    

    baseComponent.destroy();

    statusCheck = false;

    baseComponent.checkboxElem.dispatchEvent(new document.defaultView.Event('change'));

    expect(statusCheck).toBeFalsy();

    document.body.innerHTML = `
      <table>
        <tr ${TodoItemProps.dataName}>
          <td ${TodoItemProps.checkboxDataName}>Checkbox</td>
          <td ${TodoItemProps.contentDataName}>Content</td>
        </tr>
        <tr ${TodoItemProps.dataName}>
          <td colspan="2">Something else...</td>
        </tr>
      </table>
    `;

    const container = document.body.children[0];

    statusCheck = false;

    const items = TodoItem.init(container, {
      onTodoStatusChange(item) {
        statusCheck = item instanceof TodoItem;
      }
    });

    expect(statusCheck).toBeFalsy();
    expect(items[0].checkboxElem.checked).toBeFalsy();

    expect(items[0]['elem'].classList.length).toEqual(0);

    items[0].checkboxElem.checked = true;

    items[0].checkboxElem.dispatchEvent(new document.defaultView.Event('change'));

    expect(statusCheck).toBeTruthy();
    expect(items[0].checkboxElem.checked).toBeTruthy();

    expect(items[0]['elem'].classList.length).toEqual(1);
    expect(items[0]['elem'].className).toEqual(TodoItemProps.checkedClassName);

    items[0].destroy();

    statusCheck = false;

    items[0].checkboxElem.dispatchEvent(new document.defaultView.Event('change'));

    expect(statusCheck).toBeFalsy();
  });
});