type SortingCriteriaPrimitiveType = string | number | boolean | null | undefined;
type SortingCriteriaFunctionType = (a: any) => SortingCriteriaPrimitiveType;
type SortingCriteriaType =
    SortingCriteriaPrimitiveType |
    SortingCriteriaFunctionType |
    SortingCriteriaPrimitiveType[] |
    (SortingCriteriaFunctionType | string)[];
type SortingCriteriaReturnType = {
    newObj1: any,
    newObj2: any,
};

export default function deepSorting(sortingArray: any[], criteriaArray: SortingCriteriaType[] = []): void {
    if (!criteriaArray.length) {
        sortingArray.sort();
        return
    }
    sortingArray.sort((a,b) => sortingFunc(a, b, criteriaArray))
}

function sortingFunc(a: any, b: any, criteriaArray: SortingCriteriaType[], i: number = 0): number {
    if (comparing(a, b, criteriaArray[i], 'more')) {
        return 1
    } else if (comparing(a, b, criteriaArray[i], 'less')) {
        return -1
    } else if (comparing(a, b, criteriaArray[i], 'eq') && i < criteriaArray.length - 1) {
        return sortingFunc(a, b, criteriaArray, ++i)
    } else
        return 0
};

function comparing(a: any, b: any, criteriaItem: SortingCriteriaType, compareIndex: string): boolean {
    const { newObj1, newObj2 } = sortingCriteria(a, b, criteriaItem)
    switch (compareIndex) {
        case 'more':
            return newObj1 > newObj2;
        case 'eq':
            return newObj1 === newObj2;
        case 'less':
            return newObj1 < newObj2;
        default:
            return newObj1 > newObj2;
    }
}

function sortingCriteria(a: any, b: any, criteriaItem: SortingCriteriaType = null): SortingCriteriaReturnType {
    let newObj1: any;
    let newObj2: any;
    let returnObject: SortingCriteriaReturnType;

    const parseAndFind = (criteriaItem: string): void => {
        const parsedPass = criteriaItem
            .replace(/^\.|^\[/, "")
            .split(/\.|\[/)
            .map(i => (/\]/.test(i)) ? i.slice(0, -1) : i);
        newObj1 = parsedPass.reduce((resValue: any, currentValue: any) => resValue?.[currentValue], a);
        newObj2 = parsedPass.reduce((resValue: any, currentValue: any) => resValue?.[currentValue], b);
    }

    if (typeof criteriaItem === 'string') {
        parseAndFind(criteriaItem)
    }

    if (Array.isArray(criteriaItem) && typeof criteriaItem[0] === 'string') {
        parseAndFind(criteriaItem[0])
    }

    if (typeof criteriaItem === 'function') {
        newObj1 = criteriaItem(a);
        newObj2 = criteriaItem(b);
    }

    if (Array.isArray(criteriaItem) && typeof criteriaItem[0] === 'function') {
        newObj1 = criteriaItem[0](a);
        newObj2 = criteriaItem[0](b);
    }

    if (criteriaItem === null) {
        newObj1 = a;
        newObj2 = b;
    }

    if (Array.isArray(criteriaItem) && criteriaItem[1] === 'desc') {
        returnObject = {
            newObj1: newObj2,
            newObj2: newObj1
        };
    } else {
        returnObject = {
            newObj1,
            newObj2
        };
    }

    return returnObject;
}
