import { Category } from './enums';
import { BookRequiredFields, CreateCustomerFunctionType, PersonBook, UpdateBook } from './types';
import {
    bookTitleTransform,
    calcTotalPages,
    checkoutBooks,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getBookAuthorByIndex,
    getBookByID,
    getBooksByCategory,
    getBooksByCategoryPromise,
    getBookTitlesByCategory,
    getProperty,
    getTitles,
    logBookTitles,
    logCategorySearch,
    logFirstAvailable,
    logSearchResults,
    printBook,
    purge,
} from './functions';
import { Author, Book, Librarian, Logger, Magazine } from './interfaces';

// ======================================================================================
// Task 06.06 Type-Only Imports and Exports
import type { Library } from './classes';
// ======================================================================================
// Task 06.03 Default Export
// Task 06.04 Re-Export
import { Library as Lib, RefBook, Shelf, UniversityLibrarian } from './classes';

// ======================================================================================
// Task 01

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ======================================================================================
// Task 02.01 02.02

logFirstAvailable(getAllBooks());
logBookTitles(getBookTitlesByCategory(Category.JavaScript));
console.log(getBookAuthorByIndex(2));
console.log(calcTotalPages());

// ======================================================================================
// Task 03.01

const myID = createCustomerID('Ann', 10);
console.log(myID);

let idGenerator: (p1: string, p2: number) => string = (name: string, id: number) => `${id}-${name}`;
idGenerator = createCustomerID;
console.log(idGenerator('Boris', 45));

// ======================================================================================
// Task 03.02

createCustomer('Anna');
createCustomer('Anna', 23);
createCustomer('Anna', 23, 'Moscow');

console.log(getBookTitlesByCategory());
logFirstAvailable();
console.log(getBookByID(1));

const myBooks = checkoutBooks('Ann', ...[1, 2, 4]);
console.log(myBooks);

// ======================================================================================
// Task 03.03

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);
const checkedOutBooks2 = getTitles(4, true);
console.log(checkedOutBooks2);


// ======================================================================================
// Task 03.04. Assertion Functions

// console.log(bookTitleTransform({})); throw Error
// console.log(bookTitleTransform(1)); throw Error
console.log(bookTitleTransform('all'));

// ======================================================================================
// Task 04.01. Interfaces

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds and Gradients',
    author: 'Eric A Meyer',
    available: true,
    category: Category.CSS,
    // year: 2015,
    // copies: 3,
    pages: 200,
    markDamaged: (reason: string) => console.log(`Damaged: ${reason}`),
};
printBook(myBook);
myBook.markDamaged('missing back cover');

// ======================================================================================
// Task 04.02 Defining an Interface for Function Types

const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);
logDamage('missing back cover');

// ======================================================================================
// Task 04.03 Extending Interface

const favoriteAuthor: Author = {
    name: 'Anna',
    email: 'anna@mail.ru',
    numBookPublished: 1,
};

// const favoriteLibrarian: Librarian = {
//     name: 'boris',
//     email: 'boris@email.com',
//     department: 'Classical literature',
//     assistCustomer: (name: string) => console.log(`Assist name ${name}`),
// };

// ======================================================================================
// Task 04.04 Optional Chaining

const offer: any = {
    book: {
        title: 'TypeScript',
    },
};
console.log(offer.magazine); // undefined
// console.log(offer.magazine.getTitle()); // throw error
console.log(offer.magazine?.getTitle()); // undefined
// console.log(offer.book?.getTitle()); // throw error - is not a function
console.log(offer.book?.getTitle?.()); // undefined
// console.log(offer.book?.author[0]); // throw error
console.log(offer.book?.author?.[0]); // undefined

// ======================================================================================
// Task 04.05 Keyof Operator

console.log(getProperty(getAllBooks()[0], 'title'));
console.log(getProperty(getAllBooks()[0], 'markDamaged'));
// console.log(getProperty(getAllBooks()[0], 'isbn')); // error

// ======================================================================================
// Task 05.01 Creating and using Classes

// const ref: ReferenceItem = new ReferenceItem(1, 'I like TS', 2021);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'unknown';
// console.log(ref.publisher);
// console.log(ref.getId());

// ======================================================================================
// Task 05.02 Extending Classes
// Task 05.03 Creating abstract Classes
// Task 06.03 Default Export

const refBook: RefBook = new RefBook(1, 'I love TS', 3021, 3);
// const refBook = new RefBook(1, 'I love TS', 3021, 3);
console.log(refBook);
refBook.printItem();
refBook.printCitation();

// ======================================================================================
// Task 05.04 Interfaces for Class Types

const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Anna';
favoriteLibrarian.assistCustomer('Boris');
// favoriteLibrarian.a = '2' // does not exist

// ======================================================================================
// Task 05.05 Intersection and Union Types

const personBook: PersonBook = {
    name: 'Anna',
    email: 'anna@example.com',
    id: 1,
    author: 'Anna',
    available: false,
    category: Category.HTML,
    title: 'I like HTML',
    markDamaged: null,
    // pages: 154,
};
console.log(personBook);

// ======================================================================================
// Task 06.05 Dynamic Import Expression

const flag = false;
if (flag) {
    import('./classes')
        .then(module => {
            const reader = new module.Reader();
            reader.name = 'Anna';
            reader.take(getAllBooks()[2]);
            console.log(reader);
        });
}

// ======================================================================================
// Task 06.06 Type-Only Imports and Exports
let libObj: Library;
const libObj2: Library = new Lib();

// ======================================================================================
// Task 07.01 Generic Functions

const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

const result: Book[] = purge(inventory);
console.log(result);

const result2 = purge([1, 2, 3, 4, 5]);
console.log(result2);

// ======================================================================================
// Task 07.02 Generic Interfaces and Classes

const bookShelf = new Shelf<Book>();
bookShelf.add(...inventory);
console.log(bookShelf);
console.log(bookShelf.getFirst());

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf = new Shelf<Magazine>();
magazineShelf.add(...magazines);
console.log(magazineShelf);

// ======================================================================================
// Task 07.03 Generic Constraints

magazineShelf.printTitles();
console.log(magazineShelf.find('Five Points'));

console.log(getProperty(magazines[0], 'title'));
console.log(getProperty(getAllBooks()[0], 'pages'));

// ======================================================================================
// Task 07.04 Utility Types

const book: BookRequiredFields = {
    id: 1,
    author: 'Anna',
    available: false,
    category: Category.JavaScript,
    title: 'FF',
    pages: 200,
    markDamaged: null,
};

const uBook: UpdateBook = {
    title: 'FF',
    id: 2,
};

let params: Parameters<CreateCustomerFunctionType> = ['Anna', 30];
createCustomer(...params);

// ======================================================================================
// Task 08.01 Class Decorators
// Task 08.02 Class Decorators that replace constructor functions
// Task 08.03 Method Decorator

// const obj: any = new UniversityLibrarian();
// UniversityLibrarian.A = '123'; // error Cannot add property A, object is not extensible
// obj.a = 1;
// const proto = Object.getPrototypeOf(obj);
// console.log(proto);
// proto.a = 1; // error Cannot add property a, object is not extensible
// obj.name = 'Anna';
// console.log(obj);
// obj.printLibrarian();
// obj.assistFaculty = null;
// obj.teachCommunity = null; // error Cannot assign to read only property 'teachCommunity' of object '#<UniversityLibrarian>'
// console.log(obj);

// ======================================================================================
// Task 08.04 Method Decorator

const enc = new RefBook(1, 'I like TS', 2021, 4);
enc.printItem();

// ======================================================================================
// Task 08.05 Parameter Decorator
// Task 08.06 Property Decorator

const obj= new UniversityLibrarian();
obj.name = 'Anna';
obj.assistCustomer('Boris');
console.log(obj.name);
console.log(obj);

// ======================================================================================
// Task 08.07 Accessor Decorator

const enc2 = new RefBook(1, 'I love TS', 2033, 4);
// enc2.copies = -10; // error Invalid value

// ======================================================================================
// Task 09.01 Callback Functions

console.log('Begin');
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);
console.log('End');

// ======================================================================================
// 09.02 Promises

console.log('Begin');
getBooksByCategoryPromise(Category.JavaScript)
    .then(data => {
        console.log(data);
        return data.length;
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
    .finally(() => console.log('Promise is resolved or reject'));
getBooksByCategoryPromise(Category.Software)
    .then(data => console.log(data))
    .catch(err => console.log(err))
    .finally(() => console.log('Promise is resolved or reject'));
console.log('End');

// ======================================================================================
// 09.03 Async Functions

console.log('Begin');
logSearchResults(Category.JavaScript)
    .then(() => console.log('done'));
logSearchResults(Category.Software)
    .then(() => console.log('done'))
    .catch(err => console.log(err));
console.log('End');
