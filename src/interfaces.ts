import { Category } from './enums';

// ======================================================================================
// Task 02.01
interface Book {
    id: number;
    title: string;
    category: Category;
    author: string;
    available: boolean;
    pages?: number;
    // markDamaged?: (reason: string) => void;
    markDamaged?: DamageLogger;
}

// ======================================================================================
// Task 04.02 Defining an Interface for Function Types
interface DamageLogger {
    (reason: string): void;
}

// ======================================================================================
// Task 04.03 Extending Interface

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBookPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (customerName: string) => void;
}

// ======================================================================================
// Task 07.02 Generic Interfaces and Classes

interface Magazine {
    title: string;
    publisher: string;
}

// ======================================================================================
// Task 07.03 Generic Constraints

interface ShelfItem {
    title: string;
}

// ======================================================================================
// Task 09.01 Callback Functions

interface LibMgrCallback {
    (err: Error, titles: string[]): void;
}

interface Callback<T> {
    (err: Error, data: T): void;
}

// ======================================================================================
// Task 06.02 Export and Import

export { Book, DamageLogger as Logger, Person, Author, Librarian, Magazine, ShelfItem, LibMgrCallback, Callback };
