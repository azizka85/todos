import { TodosBase } from './todos-base';
import { TodosHeader } from './todos-header';
import { TodosListDisplayMode, TodosFooter } from './todos-footer';
import { TodoItem } from './todo-item';
import { TodosList } from './todos-list';

export class TodosProps {
  onCreateTodo?(title: string): void;
  onDisplayChanged?(display: boolean): void;

  onChangeDisplayMode?(mode: TodosListDisplayMode): void;
  onClearCompleted?(): void;

  onTodoStatusChange?(item: TodoItem): void;

  static className: string;
  static dataName: string;

  static titleClassName: string;
  static titleDataName: string;

  static containerClassName: string;
}

export class Todos extends TodosBase {
  protected title: HTMLElement | null;
  protected header: TodosHeader | null;
  protected list: TodosList | null;
  protected footer: TodosFooter | null;

  protected onCreateTodoHandler?(title: string): void;
  protected onDisplayChangedHandler?(display: boolean): void;

  protected onChangeDisplayModeHandler?(mode: TodosListDisplayMode): void;
  protected onClearCompletedHandler?(): void;

  protected onTodoStatusChangeHandler?(item: TodoItem);

  constructor(elem?: HTMLElement, props?: TodosProps);

  get titleElem(): HTMLElement | null;
  get headerComponent(): TodosHeader | null;
  get listComponent(): TodosList | null;
  get footerComponent(): TodosFooter | null;

  protected createTitle(): void;
  
  protected createContainer(): void;
  
  protected createHeader(container: HTMLElement): void;
  protected createList(container: HTMLElement): void;
  protected createFooter(container: HTMLElement): void;

  protected onCreateTodo(title: string): void;
  protected onDisplayChanged(display: boolean): void;
  
  protected onChangeDisplayMode(mode: TodosListDisplayMode): void;
  protected onClearCompleted(): void;

  destroy(): void;

  static init(props?: TodosProps): Todos[];
}