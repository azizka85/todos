export default class TodosGlobals {  
  static todosClassName: string;
  static todosDataName: string;

  /* ---------------- Todos header ------------------ */
  static get todosHeaderClassName(): string;
  static get todosHeaderDataName(): string;

  /* ---------------- TodosList ------------------ */
  static get todosListClassName(): string;
  static get todosListDataName(): string;

  /* ---------------- TodosListHeader ------------------ */
  static get todosListHeaderClassName(): string;
  static get todosListHeaderDataName(): string;
  static get todosListHeaderInputDataName(): string;
  static get todosListHeaderExpanderDownIconDataName(): string;
  static get todosListHeaderExpanderRightIconDataName(): string;

  /* ---------------- TodosListFooter ------------------ */
  static get todosListFooterClassName(): string;
  static get todosListFooterContainerClassName(): string;
  static get todosListFooterButtonsClassName(): string;
  static get todosListFooterButtonClassName(): string;
  static get todosListFooterDataName(): string;
  static get todosListFooterContainerDataName(): string;
  static get todosListFooterDisplayAllButtonDataName(): string;
  static get todosListFooterDisplayActiveButtonDataName(): string;
  static get todosListFooterDisplayCompletedButtonDataName(): string;
  static get todosListFooterClearCompletedButtonDataName(): string;

  /* ---------------- TodoItem ------------------ */
  static get todoItemClassName(): string;
  static get todoItemDataName(): string;
  static get todoItemTemplateDataName(): string;
  static get todoItemContainerDataName(): string;
  static get todoItemCheckboxDataName(): string;
}