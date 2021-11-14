const { JSDOM } = require('jsdom');

const { TodosBase } = require('../components/todos-base');

describe('TodosBase test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });
  
  test('Should create new base component or from html element', () => {
    const emptyComponent = new TodosBase();

    expect(emptyComponent['elem'].tagName.toLowerCase()).toEqual('div');
    expect(emptyComponent['elem'].classList.length).toEqual(0);
    expect(emptyComponent['elem'].textContent).toBeFalsy();

    const baseComponent = new TodosBase(null, 'div', 'container');

    expect(baseComponent['elem'].tagName.toLowerCase()).toEqual('div');
    expect(baseComponent['elem'].classList.length).toEqual(1);
    expect(baseComponent['elem'].className).toEqual('container');

    document.body.innerHTML = `
      <span id="container">
        Hello!
      </span>
    `;

    const elem = document.getElementById('container');

    const componentFromElem = new TodosBase(elem, 'div', 'container');

    expect(componentFromElem['elem'].tagName.toLowerCase()).toEqual('span');
    expect(componentFromElem['elem'].classList.length).toEqual(0);
    expect(componentFromElem['elem'].textContent).toContain('Hello');
  });
});