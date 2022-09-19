export class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };

    renderItems() {
        this.items.forEach(item => {
            this.renderer(item);
        });
    };

    addItem(element) {
        this._container.prepend(element);
    }
}