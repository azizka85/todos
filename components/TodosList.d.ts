export default class TodosList extends TodosBase {  
  static init(todosElem: HTMLElement): TodosList | null;

	constructor(elem: HTMLElement | null);

  protected _header: TodosListHeader | null;
  protected _footer: TodosListFooter | null;
  protected _itemTemplate: HTMLElement | null;

  protected _items: TodoItem[];

  get header(): TodosListHeader | null;
  get footer(): TodosListFooter | null;
  get itemTemplate(): HTMLElement | null;

  get items(): TodoItem[];

  addItem(title: string, completed: boolean): TodoItem;
  removeItems(items: TodoItem[]): void;

  protected _addTodoItemComponent(item: TodoItem): void;
  protected _removeItems(items: TodoItem[], fromArray: boolean): void;
  protected _createHeader(props: TodosListHeaderProps): void;
  protected _createFooter(props: TodosListFooterProps): void;
  protected _changeListDisplay(): void;
  protected _changeFooterContent(): void;
  protected _changeDisplayMode(mode: TodosListDisplayMode): void;
  protected _clearCompleted(): void;
  protected _todoStatusChanged(event: Event): void;
}

import TodoItem from "./TodoItem";
import TodosBase from "./TodosBase";
import TodosListFooter, { TodosListDisplayMode, TodosListFooterProps } from "./TodosListFooter";
import TodosListHeader, { TodosListHeaderProps } from "./TodosListHeader";

