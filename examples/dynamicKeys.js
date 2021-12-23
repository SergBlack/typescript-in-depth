var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// type ToyType = Record<string, string | boolean>;
var dataToys = [
    {
        num: '1',
        name: 'Большой шар',
        count: '2',
        year: '1960',
        shape: 'шар',
        color: 'желтый',
        size: 'большой',
        favorite: false
    },
    {
        num: '2',
        name: 'Зелёный шар с цветами',
        count: '5',
        year: '2000',
        shape: 'шар',
        color: 'зелёный',
        size: 'большой',
        favorite: false
    }
];
// need to use "as const" at the end for get keys and values types
var viewFilter = {
    shape: ['фигурка', 'снежинка'],
    color: ['красный', 'белый', 'желтый'],
    size: ['малый']
};
var filteredList = __spreadArrays(dataToys);
// value problem
filteredList.forEach(function (item) {
    Object.values(item).forEach(function (value) {
        console.log({ value: value });
        // console.log(viewFilter.shape.includes(value));
    });
});
// problem with item[filter]
Object.entries(viewFilter).forEach(function (el) {
    var filter = el[0];
    var filterValues = el[1];
    // const [filter, filterValues] = el;
    if (filterValues.length) {
        filteredList = filteredList.filter(function (item) {
            // return typeof item[filter as ViewFilterKeysType] === 'string'
            //  ? filterValues.includes(item[filter as ViewFilterKeysType])
            // : false;
            // return filterValues.includes(item[filter])
        });
    }
});
