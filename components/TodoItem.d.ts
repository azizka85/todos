import TodosBase from './TodosBase';

export interface TodoItemProps {
  onTodoStatusChange?(item: TodoItem): void;
  completed?: boolean;
  title?: string;
}

export default class TodoItem extends TodosBase {
  protected _container: HTMLElement | null;
  protected _checkbox: HTMLInputElement | null;

  constructor(elem: HTMLElement | null, props: TodoItemProps | null);

  get checkbox(): HTMLInputElement | null;
  get container(): HTMLElement | null;

  protected _createCheckbox(): void;
  protected _createContainer(): void;

  static init(todosListElem: HTMLElement, props: TodoItemProps | null): TodoItem[];
}