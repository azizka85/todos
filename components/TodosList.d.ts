export interface TodosListProps {
  onDataChanged?(): void;
}

export default class TodosList extends TodosBase {  
  static init(todosElem: HTMLElement, props: TodosListProps | null): TodosList | null;

	constructor(elem: HTMLElement | null, props: TodosListProps | null);

  protected _header: TodosListHeader | null;
  protected _footer: TodosListFooter | null;
  protected _itemTemplate: HTMLElement | null;

  protected _items: TodoItem[];

  protected _mode: TodosListDisplayMode;
  protected _props: TodosListProps | null;

  get props(): TodosListProps | null;
  get mode(): TodosListDisplayMode;
  get header(): TodosListHeader | null;
  get footer(): TodosListFooter | null;
  get itemTemplate(): HTMLElement | null;

  get items(): TodoItem[];

  addItem(title: string, completed: boolean): TodoItem;
  removeItems(items: TodoItem[]): void;
  changeDisplayMode(mode: TodosListDisplayMode): void;
  clearCompleted(): void;

  protected _removeItems(items: TodoItem[], fromArray: boolean): void;
  protected _addTodoItemComponent(item: TodoItem): void;
  protected _createHeader(props: TodosListHeaderProps): void;
  protected _createFooter(props: TodosListFooterProps): void;
  protected _changeListDisplay(): void;
  protected _changeFooterContent(): void;  
  protected _changeItemDisplayMode(): void;
  protected _todoStatusChanged(item: TodoItem): void;
}

import TodoItem from "./TodoItem";
import TodosBase from "./TodosBase";
import TodosListFooter, { TodosListDisplayMode, TodosListFooterProps } from "./TodosListFooter";
import TodosListHeader, { TodosListHeaderProps } from "./TodosListHeader";

