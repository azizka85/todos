import TodosBase from "./TodosBase";

export enum TodosListDisplayMode {
  All = 'all', 
  Active = 'active',
  Completed = 'completed'
}

export interface TodosListFooterProps {
  onChangeDisplayMode?(mode: TodosListDisplayMode): void;
  onClearCompleted?(): void;
}

export default class TodosListFooter extends TodosBase {
  protected _container: HTMLElement | null;
  protected _displayAllBtn: HTMLElement | null;
  protected _displayActiveBtn: HTMLElement | null;
  protected _displayCompletedBtn: HTMLElement | null;
  protected _clearCompletedBtn: HTMLElement | null;

  constructor(elem: HTMLElement | null, props: TodosListFooterProps | null);

  get container(): HTMLElement | null;
  get displayAllBtn(): HTMLElement | null;
  get displayActiveBtn(): HTMLElement | null;
  get displayCompletedBtn(): HTMLElement | null;
  get clearCompletedBtn(): HTMLElement | null;

  protected _createContainer(): void;
  protected _createButtons(): void;
  protected _createClearCompletedBtn(): void;

  static init(todosListElem: HTMLElement, props: TodosListFooterProps | null): TodosListFooter | null;
}