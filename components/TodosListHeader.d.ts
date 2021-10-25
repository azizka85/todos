import TodosBase from './TodosBase';

export interface TodosListHeaderProps {
  onDisplayChanged?(): void;
  onCreateTodo?(title: string): void;
}

export default class TodosListHeader extends TodosBase {
  protected _iconRight: HTMLOrSVGElement | null;
  protected _iconDown: HTMLOrSVGElement | null;
  protected _input: HTMLInputElement | null;
  protected _display: boolean;
  
  protected _props: TodosListHeaderProps | null;

  constructor(elem: HTMLElement | null, props: TodosListHeaderProps | null);

  get iconRight(): HTMLOrSVGElement | null;
  get iconDown(): HTMLOrSVGElement | null;
  get input(): HTMLInputElement | null;

  get display(): boolean;
  set display(value: boolean): void;

  protected _createIcons(): void;
  protected _createInput(): void;
  protected _changeDisplay(): void;

  static init(todosListElem: HTMLElement, props: TodosListHeaderProps | null): TodosListHeader | null;
}