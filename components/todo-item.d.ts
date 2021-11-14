import { TodosBase } from "./todos-base";

export class TodoItemProps {
  completed?: boolean;
  title?: string;

  onTodoStatusChange?(item: TodoItem): void;

  static className: string;
  static dataName: string;

  static checkedClassName: string;
  static hideClassName: string;

  static checkboxDataName: string;
  static contentDataName: string;
  static templateDataName: string;
}

export class TodoItem extends TodosBase {
  protected content: HTMLElement | null;
  protected checkbox: HTMLInputElement | null;

  constructor(elem?: HTMLElement, props?: TodoItemProps);

  get contentElem(): HTMLElement | null;
  get checkboxElem(): HTMLInputElement | null;

  protected createContent(): void;
  protected createCheckbox(): void;

  destroy(): void;

  static init(todosListElem: HTMLElement, props?: TodoItemProps): TodoItem[];
}