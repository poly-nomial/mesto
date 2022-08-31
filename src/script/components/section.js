export class Section {
    constructor({ item, renderer }, containerSelector) {
        this._item = item;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };

    renderItem() {
        this._renderer(this._item);
    };

    addItem(element) {
        this._container.prepend(element);
    }
}