import { Author, Book, Person } from './interfaces';

// ======================================================================================
// Task 04.05 Keyof Operator
export type BookProperties = keyof Book;

// ======================================================================================
// Task 05.05 Intersection and Union Types

export type PersonBook = Person & Book;

export type BookOrUndefined = Book | undefined;

// ======================================================================================
// Task 07.04 Utility Types

export type BookRequiredFields = Required<Book>;
export type UpdateBook = Partial<Book>;

export type AuthorWoEmail = Omit<Author, 'email'>;
export type CreateCustomerFunctionType = (name: string, age?: number, city?: string) => void;



type ParamType<T> = T extends (name: infer R, age?: number, city?: string) => void ? R : T;
type Param1 = ParamType<CreateCustomerFunctionType>;
