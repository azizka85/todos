const { JSDOM } = require('jsdom');

const { TodoItem, TodoItemProps } = require('../components/todo-item');
const { TodosFooterProps, TodosListDisplayMode } = require('../components/todos-footer');
const { TodosListProps, TodosList } = require('../components/todos-list');

describe('TodosListProps test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });

  test('Initial props should be correct', () => {
    expect(TodosListProps.className).toEqual('todos-list');
    expect(TodosListProps.dataName).toEqual('data-todos-list');

    expect(TodosListProps.hideClassName).toEqual('todos-list-hide');
  });

  test('Handlers of props should work correctly', () => {
    const props = new TodosListProps();

    props.onTodoStatusChange = (item) => {
      expect(item).toBeInstanceOf(TodoItem);
    };

    props.onTodoStatusChange(new TodoItem());
  });
});

describe('TodosList test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });

  test('Should create new base component or from html element', () => {
    const baseComponent = new TodosList();

    expect(baseComponent['elem'].tagName.toLowerCase()).toEqual('ul');
    expect(baseComponent['elem'].classList.length).toEqual(1);
    expect(baseComponent['elem'].className).toEqual(TodosListProps.className);

    baseComponent.changeListDisplay(false);

    expect(baseComponent['elem'].classList.length).toEqual(2);
    expect(baseComponent['elem'].classList[1]).toEqual(TodosListProps.hideClassName);

    baseComponent.changeListDisplay(true);

    expect(baseComponent['elem'].classList.length).toEqual(1);

    expect(baseComponent.displayMode).toEqual(TodosFooterProps.defaultDisplayListMode);

    const item1 = baseComponent.addItem('Task #1', false);

    expect(baseComponent.itemsList.length).toEqual(1);
    expect(baseComponent['elem'].children.length).toEqual(1);

    expect(item1['elem']).toBe(baseComponent['elem'].children[0]);
    expect(item1['elem'].classList.length).toEqual(1);
    expect(item1.checkboxElem.checked).toBeFalsy();
    expect(item1.contentElem.textContent).toEqual('Task #1');

    const item2 = baseComponent.addItem('Task #2', true);

    expect(baseComponent.itemsList.length).toEqual(2);
    expect(baseComponent['elem'].children.length).toEqual(2);

    expect(item2['elem']).toBe(baseComponent['elem'].children[1]);
    expect(item2['elem'].classList.length).toEqual(2);
    expect(item2.checkboxElem.checked).toBeTruthy();
    expect(item2.contentElem.textContent).toEqual('Task #2');

    const item3 = baseComponent.addItem('Task #3', false);

    expect(baseComponent.itemsList.length).toEqual(3);
    expect(baseComponent['elem'].children.length).toEqual(3);

    expect(item3['elem']).toBe(baseComponent['elem'].children[2]);
    expect(item3['elem'].classList.length).toEqual(1);
    expect(item3.checkboxElem.checked).toBeFalsy();
    expect(item3.contentElem.textContent).toEqual('Task #3');    

    baseComponent.changeDisplayMode(TodosListDisplayMode.Active);

    expect(baseComponent.displayMode).toEqual(TodosListDisplayMode.Active);

    expect(item1['elem'].classList.length).toEqual(1);
    expect(item2['elem'].classList.length).toEqual(3);
    expect(item2['elem'].classList[2]).toEqual(TodoItemProps.hideClassName);
    expect(item3['elem'].classList.length).toEqual(1);

    baseComponent.changeDisplayMode(TodosListDisplayMode.Completed);

    expect(baseComponent.displayMode).toEqual(TodosListDisplayMode.Completed);

    expect(item1['elem'].classList.length).toEqual(2);
    expect(item1['elem'].classList[1]).toEqual(TodoItemProps.hideClassName);
    expect(item2['elem'].classList.length).toEqual(2);
    expect(item3['elem'].classList.length).toEqual(2);
    expect(item3['elem'].classList[1]).toEqual(TodoItemProps.hideClassName);

    baseComponent.clearCompleted();

    expect(baseComponent.itemsList.length).toEqual(2);
    expect(baseComponent['elem'].children.length).toEqual(2);

    expect(item1).toBe(baseComponent.itemsList[0]);
    expect(item1['elem']).toBe(baseComponent['elem'].children[0]);
    expect(item3).toBe(baseComponent.itemsList[1]);
    expect(item3['elem']).toBe(baseComponent['elem'].children[1]);

    document.body.innerHTML = `
      <div>
        <template ${TodoItemProps.templateDataName}>
          <tr ${TodoItemProps.dataName}>
            <td ${TodoItemProps.checkboxDataName}></td>
            <td ${TodoItemProps.contentDataName}></td>
          </tr>
        </template>
        <table ${TodosListProps.dataName}>
          <tr ${TodoItemProps.dataName}>
            <td ${TodoItemProps.checkboxDataName}>Checkbox</td>
            <td ${TodoItemProps.contentDataName}>Task #1</td>
          </tr>
          <tr ${TodoItemProps.dataName}>
            <td colspan="2">Something else...</td>
          </tr>
        </table>              
      </div>
    `;

    expect(document.body.children.length).toEqual(1);

    const container = document.body.children[0];

    expect(container.tagName.toLowerCase()).toEqual('div');
    expect(container.children.length).toEqual(2);

    const todosList = TodosList.init(container);

    expect(todosList).toBeTruthy();
    expect(todosList.displayMode).toEqual(TodosFooterProps.defaultDisplayListMode);
    expect(todosList['elem'].tagName.toLowerCase()).toEqual('table');
    expect(todosList['elem']).toBe(container.children[1]);
    expect(todosList['elem'].hasAttribute(TodosListProps.dataName)).toBeTruthy();
    expect(todosList.itemsList.length).toEqual(2);
    expect(todosList['elem'].children.length).toEqual(1);

    const tbody = todosList['elem'].children[0];

    expect(tbody.children.length).toEqual(2);

    expect(todosList.itemsList[0]['elem']).toBe(tbody.children[0]);
    expect(todosList.itemsList[0]['elem'].tagName.toLowerCase()).toEqual('tr');
    expect(todosList.itemsList[0]['elem'].classList.length).toEqual(0);
    expect(todosList.itemsList[0]['elem'].hasAttribute(TodoItemProps.dataName)).toBeTruthy();
    expect(todosList.itemsList[0]['elem'].children.length).toEqual(2);

    expect(todosList.itemsList[0].checkboxElem).toBeTruthy();
    expect(todosList.itemsList[0].checkboxElem.tagName.toLowerCase()).toEqual('td');
    expect(todosList.itemsList[0].checkboxElem).toBe(todosList.itemsList[0]['elem'].children[0]);
    expect(todosList.itemsList[0].checkboxElem.hasAttribute(TodoItemProps.checkboxDataName)).toBeTruthy();
    expect(todosList.itemsList[0].checkboxElem.textContent).toEqual('Checkbox');

    expect(todosList.itemsList[0].contentElem).toBeTruthy();
    expect(todosList.itemsList[0].contentElem.tagName.toLowerCase()).toEqual('td');;
    expect(todosList.itemsList[0].contentElem).toBe(todosList.itemsList[0]['elem'].children[1]);
    expect(todosList.itemsList[0].contentElem.hasAttribute(TodoItemProps.contentDataName)).toBeTruthy();
    expect(todosList.itemsList[0].contentElem.textContent).toEqual('Task #1');

    expect(todosList.itemsList[1]['elem']).toBe(tbody.children[1]);
    expect(todosList.itemsList[1]['elem'].tagName.toLowerCase()).toEqual('tr');
    expect(todosList.itemsList[1]['elem'].classList.length).toEqual(0);
    expect(todosList.itemsList[1]['elem'].hasAttribute(TodoItemProps.dataName)).toBeTruthy();
    expect(todosList.itemsList[1]['elem'].children.length).toEqual(1);

    expect(todosList.itemsList[1].checkboxElem).toBeFalsy();
    expect(todosList.itemsList[1].contentElem).toBeFalsy();

    todosList.itemsList.splice(1, 1);
    tbody.removeChild(tbody.children[1]);

    expect(container.children[0].hasAttribute(TodoItemProps.templateDataName)).toBeTruthy();  
    expect(container.children[0].content).toBeTruthy();
    
    const itemTemplate = container.children[0].content;

    expect(itemTemplate.children.length).toEqual(1);

    const templateItem = itemTemplate.children[0];

    expect(templateItem.tagName.toLowerCase()).toEqual('tr');
    expect(templateItem.hasAttribute(TodoItemProps.dataName)).toBeTruthy();

    expect(todosList.itemTemplate).toBeTruthy();    
    expect(todosList.itemTemplate.tagName.toLowerCase()).toEqual('tr');
    expect(todosList.itemTemplate).toBe(templateItem);
    expect(todosList.itemTemplate.hasAttribute(TodoItemProps.dataName)).toBeTruthy();

    const todoItem1 = todosList.itemsList[0];
    const todoItem2 = todosList.addItem('Task #2', true);

    expect(todosList.itemsList.length).toEqual(2);
    expect(todosList.itemsList[1]).toEqual(todoItem2);

    expect(todoItem2['elem'].tagName.toLowerCase()).toEqual('tr');
    expect(todoItem2['elem'].hasAttribute(TodoItemProps.dataName)).toBeTruthy();
    expect(todoItem2['elem']).not.toBe(templateItem);
    expect(todoItem2['elem'].children.length).toEqual(2);
    expect(todoItem2['elem'].classList.length).toEqual(1);
    expect(todoItem2['elem'].className).toEqual(TodoItemProps.checkedClassName);

    expect(todoItem2.checkboxElem).toBe(todoItem2['elem'].children[0]);
    expect(todoItem2.checkboxElem.hasAttribute(TodoItemProps.checkboxDataName)).toBeTruthy();
    expect(todoItem2.checkboxElem.checked).toBeTruthy();

    expect(todoItem2.contentElem).toBe(todoItem2['elem'].children[1]);
    expect(todoItem2.contentElem.hasAttribute(TodoItemProps.contentDataName)).toBeTruthy();
    expect(todoItem2.contentElem.textContent).toEqual('Task #2');
    
    expect(todosList['elem'].classList.length).toEqual(0);

    todosList.changeListDisplay(false);

    expect(todosList['elem'].classList.length).toEqual(1);
    expect(todosList['elem'].classList[0]).toEqual(TodosListProps.hideClassName);

    todosList.changeListDisplay(true);

    expect(todosList['elem'].classList.length).toEqual(0);

    todosList.changeDisplayMode(TodosListDisplayMode.Active);

    expect(todoItem1['elem'].classList.length).toEqual(0);
    expect(todoItem2['elem'].classList.length).toEqual(2);
    expect(todoItem2['elem'].classList[1]).toEqual(TodoItemProps.hideClassName);

    todosList.changeDisplayMode(TodosListDisplayMode.Completed);

    expect(todoItem1['elem'].classList.length).toEqual(1);
    expect(todoItem1['elem'].classList[0]).toEqual(TodoItemProps.hideClassName);
    expect(todoItem2['elem'].classList.length).toEqual(1);

    todosList.changeDisplayMode(TodosListDisplayMode.All);

    expect(todoItem1['elem'].classList.length).toEqual(0);
    expect(todoItem2['elem'].classList.length).toEqual(1);

    todosList.clearCompleted();

    expect(todosList.itemsList.length).toEqual(1);
    expect(todosList.itemsList[0]).toBe(todoItem1);
    expect(todosList['elem'].children.length).toEqual(1);
    expect(tbody.children[0]).toBe(todoItem1['elem']);
  });

  test('Handlers should work correctly', () => {
    let statusCheck = false;

    const baseComponent = new TodosList(null, {
      onTodoStatusChange(item) {
        statusCheck = item instanceof TodoItem;
      }
    });

    baseComponent.addItem('Task #1', true);

    expect(baseComponent.itemsList[0]['elem'].classList.length).toEqual(2);
    expect(baseComponent.itemsList[0]['elem'].classList[0]).toEqual(TodoItemProps.className);
    expect(baseComponent.itemsList[0]['elem'].classList[1]).toEqual(TodoItemProps.checkedClassName);

    expect(statusCheck).toBeFalsy();

    baseComponent.itemsList[0].checkboxElem.checked = false;

    baseComponent.itemsList[0].checkboxElem.dispatchEvent(
      new document.defaultView.Event('change')
    );

    expect(statusCheck).toBeTruthy();

    expect(baseComponent.itemsList[0]['elem'].classList.length).toEqual(1);
    expect(baseComponent.itemsList[0]['elem'].className).toEqual(TodoItemProps.className);

    statusCheck = false;

    baseComponent.destroy();

    baseComponent.itemsList[0].checkboxElem.dispatchEvent(
      new document.defaultView.Event('change')
    );

    expect(statusCheck).toBeFalsy();

    document.body.innerHTML = `
      <div>
        <template ${TodoItemProps.templateDataName}>
          <tr ${TodoItemProps.dataName}>
            <td ${TodoItemProps.checkboxDataName}></td>
            <td ${TodoItemProps.contentDataName}></td>
          </tr>
        </template>
        <table ${TodosListProps.dataName}>
          <tr ${TodoItemProps.dataName}>
            <td ${TodoItemProps.checkboxDataName}>Checkbox</td>
            <td ${TodoItemProps.contentDataName}>Task #1</td>
          </tr>
          <tr ${TodoItemProps.dataName}>
            <td colspan="2">Something else...</td>
          </tr>
        </table>              
      </div>
    `;

    const container = document.body.children[0];

    statusCheck = false;

    const todosList = TodosList.init(container, {
      onTodoStatusChange(item) {
        statusCheck = item instanceof TodoItem;
      }
    });

    const todoItem1 = todosList.itemsList[0];

    expect(todoItem1['elem'].classList.length).toEqual(0);
  
    expect(statusCheck).toBeFalsy();

    todoItem1.checkboxElem.checked = true;

    todoItem1.checkboxElem.dispatchEvent(
      new document.defaultView.Event('change')
    );

    expect(statusCheck).toBeTruthy();

    expect(todoItem1['elem'].classList.length).toEqual(1);
    expect(todoItem1['elem'].className).toEqual(TodoItemProps.checkedClassName);

    statusCheck = false;

    todosList.destroy();

    todoItem1.checkboxElem.dispatchEvent(
      new document.defaultView.Event('change')
    );

    expect(statusCheck).toBeFalsy();
  });
});