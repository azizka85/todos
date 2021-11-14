import { TodosBase } from "./todos-base";

export enum TodosListDisplayMode {
  All = 'all', 
  Active = 'active',
  Completed = 'completed'
}

export class TodosFooterProps {
  onChangeDisplayMode?(mode: TodosListDisplayMode): void;
  onClearCompleted?(): void;

  static defaultDisplayListMode: TodosListDisplayMode;

  static className: string;
  static dataName: string;

  static infoClassName: string;
  static infoDataName: string;

  static buttonsClassName: string;
  static buttonClassName: string;
  static buttonActiveClassName: string;

  static displayAllBtnDataName: string;
  static displayActiveBtnDataName: string;
  static displayCompletedBtnDataName: string;
  static clearCompletedBtnDataName: string;
}

export class TodosFooter extends TodosBase {
  protected info: HTMLElement | null;
  protected displayAllBtn: HTMLElement | null;
  protected displayActiveBtn: HTMLElement | null;
  protected displayCompletedBtn: HTMLElement | null;
  protected clearCompletedBtn: HTMLElement | null;

  protected displayAllBtnClickHandler?(): void;
  protected displayActiveBtnClickHandler?(): void;
  protected displayCompletedBtnClickHandler?(): void;
  protected clearCompletedBtnClickHandler?(): void;

  constructor(elem?: HTMLElement, props?: TodosFooterProps);

  get infoElem(): HTMLElement | null;
  get displayAllBtnElem(): HTMLElement | null;
  get displayActiveBtnElem(): HTMLElement | null;
  get displayCompletedBtnElem(): HTMLElement | null;
  get clearCompletedBtnElem(): HTMLElement | null;

  protected createInfo(): void;
  protected createButtons(): void;
  protected createClearCompletedBtn(): void;
  protected changeDisplayMode(mode: TodosListDisplayMode);

  destroy(): void;

  static init(todosElem: HTMLElement, props?: TodosFooterProps): TodosFooter | null;
}