// ======================================================================================
// Task 05.04 Interfaces for Class Types

import * as Interfaces from '../interfaces';
import { format, logger, logMethod, logParameter, sealed, writable } from '../decorators';


// ======================================================================================
// Task 08.01 Class Decorators
// Task 08.02 Class Decorators that replace constructor functions
// Task 08.03 Method Decorator
// Task 08.05 Parameter Decorator

// @sealed('UniversityLibrarian')
// @logger
export class UniversityLibrarian implements Interfaces.Librarian {
    @format() name: string;
    email: string;
    department: string;
    a: string = 'test';

    @logMethod
    assistCustomer(@logParameter customerName: string): void {
        console.log(`${this.name} is assisting ${customerName}`);
    }

    // @writable(true)
    assistFaculty(): void {
        console.log('Assist faculty');
    }

    // @writable(false)
    teachCommunity(): void {
        console.log('Teaching community');
    }
}

// ======================================================================================
// Task 06.02 Export and Import

// export { UniversityLibrarian };
