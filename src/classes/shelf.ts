import * as Interfaces from '../interfaces';

// ======================================================================================
// Task 07.02 Generic Interfaces and Classes

export default class Shelf<T extends Interfaces.ShelfItem> {
    private items: T[] = [];

    add(...item: T[]) {
        this.items.push(...item);
    }

    getFirst(): T {
        return this.items[0];
    }


    // ======================================================================================
    // Task 07.03 Generic Constraints

    find(title: string): T {
        return this.items.find(item => item.title === title);
    }

    printTitles(): void {
        this.items.forEach(item => console.log(item.title));
    }
}
