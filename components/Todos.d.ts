export default class Todos extends TodosBase {
    static init(props: TodosListProps | null): Todos[];

    constructor(elem: HTMLElement | null, props: TodosListProps | null);

    protected _header: HTMLElement | null;
    protected _list: TodosList | null;

    get header(): HTMLElement | null;
    get list(): TodosList | null;

    protected _createHeader(): void;
    protected _createList(props: TodosListProps | null): void;
}

import TodosBase from "./TodosBase";
import TodosList, { TodosListProps } from "./TodosList";

