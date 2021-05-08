// ======================================================================================
// Task 05.01 Creating and using Classes
// Task 05.03 Creating abstract Classes
// Task 06.02 Export and Import
// Task 08.04 Method Decorator @timeout

import { timeout } from '../decorators';

export abstract class ReferenceItem {
    // title: string; // public by default
    // year: number; // public by default
    //
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    #id: number; // hard private

    private _publisher: string; // soft private

    static department: string = 'Classical literature'; // static свойство класса, а не экземпляра

    get publisher(): string {
        // eslint-disable-next-line no-underscore-dangle
        return this._publisher.toUpperCase();
    }
    set publisher(newPublisher) {
        // eslint-disable-next-line no-underscore-dangle
        this._publisher = newPublisher;
    }

    constructor(id: number, public title: string, public year: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }


    @timeout(1000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(ReferenceItem.department);
    }

    getId(): number {
        return this.#id;
    }

    abstract printCitation(): void ;
}
