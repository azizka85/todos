export default class TodosBase {
	constructor(
    elem: HTMLElement | null, 
    tagName: string, 
    className: string
	);

	protected _component: HTMLElement;

	protected _createComponent(tagName: string, className: string): HTMLElement;

	get component(): HTMLElement;
}
