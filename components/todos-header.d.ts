import { TodosBase } from './todos-base';

export class TodosHeaderProps {
  onDisplayChanged?(display: boolean): void;
  onCreateTodo?(title: string): void;

  static className: string;
  static dataName: string;

  static inputDataName: string;
  static downIconDataName: string;
  static rightIconDataName: string;

  static iconHideClassName: string;
}

export class TodosHeader extends TodosBase {  
  protected downIcon: HTMLElement | null;
  protected rightIcon: HTMLElement | null;
  protected input: HTMLInputElement | null;

  protected downIconClickHandler?(): void;
  protected rightIconClickHandler?(): void;
  protected inputKeyUpHandler?(event: KeyboardEvent): void;

  constructor(elem?: HTMLElement, props?: TodosHeaderProps);

  get downIconElem(): HTMLElement | null;
  get rightIconElem(): HTMLElement | null;
  get inputElem(): HTMLInputElement | null;

  protected createIcons(): void;
  protected createInput(): void;
  protected changeDisplay(value: boolean): void;
  
  destroy(): void;

  static init(todosElem: HTMLElement, props?: TodosHeaderProps): TodosHeader | null;
}