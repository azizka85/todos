export class TodosBase {
  protected elem: HTMLElement;

  constructor(elem?: HTMLElement, tagName?: string, className?: string);

  protected createElement(tagName?: string, className?: string): HTMLElement;
}