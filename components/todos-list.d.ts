import { TodoItem } from "./todo-item";
import { TodosBase } from "./todos-base";
import { TodosListDisplayMode } from "./todos-footer";

export class TodosListProps {
  onTodoStatusChange?(item: TodoItem);

  static className: string;  
  static dataName: string;  

  static hideClassName: string;
}

export class TodosList extends TodosBase {
  itemTemplate: HTMLTemplateElement | null;

  protected mode: TodosListDisplayMode;
  protected items: TodoItem[];

  protected props?: TodosListProps;

  constructor(elem?: HTMLElement, props?: TodosListProps);

  get displayMode(): TodosListDisplayMode;
  get itemsList(): TodoItem[];

  addItem(title: string, completed: boolean): TodoItem;
  changeDisplayMode(mode: TodosListDisplayMode): void;
  changeListDisplay(display: boolean): void;
  clearCompleted(): void;

  protected updateItemDisplayMode(item: TodoItem): void;

  destroy(): void;

  static init(todosElem: HTMLElement, props?: TodosListProps): TodosList | null;
}