export default class TodosGlobals {  
  static todosClassName = 'todos';
  static todosDataName = 'data-todos';

  /* ---------------- Todos header ------------------ */
  static get todosHeaderClassName() {
    return this.todosClassName + '-header';
  }

  static get todosHeaderDataName() {
    return this.todosDataName + '-header';
  }


  /* ---------------- TodosList ------------------ */
  static get todosListClassName() {
    return this.todosClassName + '-list';
  }

  static get todosListDataName() {
    return this.todosDataName + '-list';
  }

  /* ---------------- TodosListHeader ------------------ */
  static get todosListHeaderClassName() {
    return this.todosListClassName + '-header';
  }

  static get todosListHeaderDataName() {
    return this.todosListDataName + '-header';
  }

  static get todosListHeaderInputDataName() {
    return this.todosListHeaderDataName + '-input';
  }

  static get todosListHeaderExpanderDownIconDataName() {
    return this.todosListHeaderDataName + '-expander-down-icon';
  }

  static get todosListHeaderExpanderRightIconDataName() {
    return this.todosListHeaderDataName + '-expander-right-icon';
  }


  /* ---------------- TodosListFooter ------------------ */
  static get todosListFooterClassName() {
    return this.todosListClassName + '-footer';
  }

  static get todosListFooterContainerClassName() {
    return this.todosListFooterClassName + '-container';
  }

  static get todosListFooterButtonsClassName() {
    return this.todosListFooterClassName + '-buttons';
  }

  static get todosListFooterButtonClassName() {
    return this.todosListFooterClassName + '-button';
  }

  static get todosListFooterDataName() {
    return this.todosListDataName + '-footer';
  }

  static get todosListFooterContainerDataName() {
    return this.todosListFooterDataName + '-container';
  }

  static get todosListFooterDisplayAllButtonDataName() {
    return this.todosListFooterDataName + '-btn-all';
  }

  static get todosListFooterDisplayActiveButtonDataName() {
    return this.todosListFooterDataName + '-btn-active';
  }

  static get todosListFooterDisplayCompletedButtonDataName() {
    return this.todosListFooterDataName + '-btn-completed';
  }

  static get todosListFooterClearCompletedButtonDataName() {
    return this.todosListFooterDataName + '-btn-clear-completed';
  }


  /* ---------------- TodoItem ------------------ */
  static get todoItemClassName() {
    return this.todosListClassName + '-item';
  }

  static get todoItemDataName() {
    return this.todosListDataName + '-item';
  }

  static get todoItemTemplateDataName() {
    return this.todoItemDataName + '-template';
  }

  static get todoItemContainerDataName() {
    return this.todoItemDataName + '-container';
  }

  static get todoItemCheckboxDataName() {
    return this.todoItemDataName + '-checkbox';
  }
}