import { ReferenceItem } from './reference-item';
import { positiveInteger } from '../decorators';

// ======================================================================================
// Task 05.02 Extending Classes
// Task 05.03 Creating abstract Classes
// Task 06.03 Default Export

export default class Encyclopedia extends ReferenceItem {
    private _copies: number;

    get copies(): number {
        // eslint-disable-next-line no-underscore-dangle
        return this._copies;
    }

    @positiveInteger
    set copies(value: number) {
        // eslint-disable-next-line no-underscore-dangle
        this._copies = value;
    }

    constructor(id: number, title: string, year: number, public edition: number) {
        super(id, title, year);
    }

    printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}
