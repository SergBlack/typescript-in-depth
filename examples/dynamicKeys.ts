type ToyType = {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: 'шар' | 'фигурка' | 'снежинка';
    color: string;
    size: string;
    favorite: boolean;
};

// type ToyType = Record<string, string | boolean>;

const dataToys: ToyType[] = [
    {
        num: '1',
        name: 'Большой шар',
        count: '2',
        year: '1960',
        shape: 'шар',
        color: 'желтый',
        size: 'большой',
        favorite: false,
    },
    {
        num: '2',
        name: 'Зелёный шар с цветами',
        count: '5',
        year: '2000',
        shape: 'шар',
        color: 'зелёный',
        size: 'большой',
        favorite: false,
    }
];

// need to use "as const" at the end for get keys and values types
const viewFilter = {
    shape: ['фигурка', 'снежинка'],
    color: ['красный','белый','желтый'],
    size: ['малый'],
} as const;

// get type of keys
type ViewFilterKeysType = keyof typeof viewFilter;
// get type of values
type ViewValuesType = typeof viewFilter[ViewFilterKeysType];

let filteredList = [...dataToys];

// value problem
filteredList.forEach(item => {
    Object.values(item).forEach(value => {
        console.log(viewFilter.shape.includes(value));
    });
});

// problem with item[filter]
Object.entries(viewFilter).forEach((el) => {
    const filter = el[0] as ViewFilterKeysType;
    const filterValues = el[1];
    // const [filter, filterValues] = el;

    if (filterValues.length) {
        filteredList = filteredList.filter((item) => {
            // return typeof item[filter as ViewFilterKeysType] === 'string'
            //  ? filterValues.includes(item[filter as ViewFilterKeysType])
            // : false;
            // return filterValues.includes(item[filter])
        });
    }
});
