export default class Todos extends TodosBase {
    static init(): Todos[];

    constructor(elem: HTMLElement | null);

    protected _header: HTMLElement | null;
    protected _list: TodosList | null;

    get header(): HTMLElement | null;
    get list(): TodosList | null;

    protected _createHeader(elem: HTMLElement): void;
    protected _createList(elem: HTMLElement): void;
}

import TodosBase from "./TodosBase";
import TodosList from "./TodosList";

