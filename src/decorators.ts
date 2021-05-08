// ======================================================================================
// Task 08.01 Class Decorators

export function sealed(p: string) {
    return function(target: Function): void {
        console.log(`Sealing the constructor ${p}`);
        Object.seal(target);
        Object.seal(target.prototype);
        console.log(target);
        console.log(target.name);
        console.log(target.prototype);
    };
}

// ======================================================================================
// Task 08.02 Class Decorators that replace constructor functions

export function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newConstructor: Function = function() {
        console.log('Creating new instance');
        console.log(target.name);

        this.age = 30;
    };
    newConstructor.prototype = Object.create(target.prototype);

    newConstructor.prototype.printLibrarian = function() {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}

// ======================================================================================
// Task 08.03 Method Decorator

export function writable(isWritable: boolean) {
    return function(target: object | Function, methodName: string, descriptor: PropertyDescriptor) {
        descriptor.writable = isWritable;
        return descriptor;
    };
}

// ======================================================================================
// Task 08.04 Method Decorator

export function timeout(ms: number) {
    return function(target: object | Function, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            setTimeout(() => {
                originalMethod.apply(this, args);
            }, ms);
        };

        return descriptor;
    };
}

// ======================================================================================
// Task 08.05 Parameter Decorator

export function logParameter(target: object | Function, methodName: string, index: number) {
    const key = `${methodName}_decor_params_indexes`;

    if (Array.isArray(target[key])) {
        target[key].push(index);
    } else {
        target[key] = [index];
    }
}

export function logMethod(target: object | Function, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        const key = `${methodName}_decor_params_indexes`;
        const indexes = target[key];

        if (Array.isArray(indexes)) {
            args.forEach((arg, i) => {
                if (indexes.indexOf(i) !== -1) {
                    console.log(`Method: ${methodName}, ParamIndex: ${i}, ParamValue: ${arg}`);
                }
            });
        }

        return originalMethod.apply(this, args);
    };

    return descriptor;
}

// ======================================================================================
// Task 08.06 Property Decorator

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

export function format(pref: string = 'Mr./Mrs') {
    return function (target: object, propertyName: string) {
        makeProperty(target, propertyName, value => `${pref} ${value}`, value => value);
    };
}

export function positiveInteger(target: object, propertyName: string, descriptor: PropertyDescriptor) {
    const originalSet = descriptor.set;

    descriptor.set = function(value: number) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        originalSet.call(this, value);
    };

    return descriptor;
}
