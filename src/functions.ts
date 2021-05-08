/* eslint-disable no-redeclare */
import { Category } from './enums';
import { Book, Callback, LibMgrCallback, Logger } from './interfaces';
import { BookOrUndefined, BookProperties } from './types';

// ======================================================================================
// Task 02.01 02.02

export const getAllBooks = (): Book[] => ([
    { id: 1, category: Category.JavaScript, title: 'Refactoring JavaScript', author: 'Evan' +
            ' Burchard', available: true },
    { id: 2, category: Category.JavaScript, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false },
    { id: 3, category: Category.CSS, title: 'CSS Secrets', author: 'Lea Verou', available: true },
    {
        id: 4, category: Category.JavaScript,
        title: 'Mastering JavaScript Object-Oriented Programming',
        author: 'Andrea Chiarelli',
        available: true
    }
]);

export const logFirstAvailable = (books: readonly Book[] = getAllBooks()): void => {
    const numBooks = books.length; // type number default
    const title: string | undefined = books.find(book => book.available)?.title;
    console.log(`Number of Books: ${numBooks}`);
    console.log(`First available Book: ${title}`);
};

export const getBookTitlesByCategory = (category: Category = Category.JavaScript): string[] => {
    const books = getAllBooks();
    return books.filter(book => book.category === category).map(book => book.title);
};

export const logBookTitles = (titles: string[]): void => {
    titles.forEach(title => console.log(title));
};

export const getBookAuthorByIndex = (index: number): [string, string] => {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
};

export const calcTotalPages = (): bigint => {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    return data.reduce((acc, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);
};

// ======================================================================================
// Task 03.01. export Function Type

export function createCustomerID(name: string, id: number) {
    return `${id}-${name}`;
}

// ======================================================================================
// Task 03.02. Optional, Default and Rest Parameters

export function createCustomer(name?: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);
    if (age) {
        console.log(`Customer age: ${age}`);
    }
    if (city) {
        console.log(`Customer city: ${city}`);
    }
}

export function getBookByID(id: number): BookOrUndefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

export function checkoutBooks(customer: string, ...booksIDs: number[]): string[] {
    console.log(`Customer: ${customer}`);

    const books = getAllBooks();

    return booksIDs
        .map(id => getBookByID(id))
        .filter(book => book.available)
        .map(book => book.title);
}

// ======================================================================================
// Task 03.03. Function Overloading

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]): string[] {
    const books = getAllBooks();
    let titles: string[] = [];

    if (args.length === 1) {
        const [arg] = args;
        if (typeof arg === 'string') {
            titles = books.filter(book => book.author === arg).map(book => book.title);
        } else if (typeof arg === 'boolean') {
            titles = books.filter(book => book.available === arg).map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof available === 'boolean') {
            titles = books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }

    return titles;
}

// ======================================================================================
// Task 03.04. Assertion Functions

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);

    return [...title].reverse().join('');
}

// ======================================================================================
// Task 04.01. Interfaces

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

// ======================================================================================
// Task 04.05 Keyof Operator

// export function getProperty(book: Book, prop: BookProperties): any {
//     if (typeof book[prop] === 'function') {
//         return (book[prop] as Function).name;
//     }
//     return book[prop];
// }

// ======================================================================================
// Task 07.01 Generic Functions

export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

// ======================================================================================
// Task 07.03 Generic Constraints

export function getProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string {
    if (typeof obj[prop] === 'function') {
        return obj[prop]['name'];
    }
    return obj[prop];
}

// ======================================================================================
// Task 09.01 Callback Functions

export function getBooksByCategory(category: Category, callback: Callback<string[]>): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No Books found');
            }
        } catch(err) {
            callback(err, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error, titles: string[]): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
}

// ======================================================================================
// 09.02 Promises

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No Books found');
            }
        }, 2000);
    });

    return p;
}

// ======================================================================================
// 09.03 Async Functions

export async function logSearchResults(category: Category): Promise<string[]> {
    const result = await getBooksByCategoryPromise(category);
    console.log(result);
    return result;
}

