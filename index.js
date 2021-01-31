function deepSorting(sortingArray, criteriaArray = []) {
    if (!criteriaArray.length) {
        sortingArray.sort();
        return
    }
    sortingArray.sort((a,b) => sortingFuncNew(a, b, criteriaArray))
}

function sortingFuncNew(a, b, criteriaArray, i = 0) {
    if (comparing(a, b, criteriaArray[i], 'more')) {
        return 1
    } else if (comparing(a, b, criteriaArray[i], 'less')) {
        return -1
    } else if (comparing(a, b, criteriaArray[i], 'eq') && i < criteriaArray.length - 1) {
        return sortingFuncNew(a, b, criteriaArray, ++i)
    } else
        return 0
};

function comparing(a, b, criteriaItem, compareIndex) {
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

function sortingCriteria(a, b, criteriaItem = null) {
    let newObj1;
    let newObj2;

    if (typeof criteriaItem === 'string') {
        const parsedPass = criteriaItem
            .split(/\.|\[/)
            .map(i => (/\]/.test(i)) ? i.slice(0, -1) : i);
        newObj1 = parsedPass.reduce((resValue, currentValue) => resValue[currentValue], a);
        newObj2 = parsedPass.reduce((resValue, currentValue) => resValue[currentValue], b);
    }

    if (typeof criteriaItem === 'function') {
        newObj1 = criteriaItem(a);
        newObj2 = criteriaItem(b);
    }

    if (criteriaItem === null) {
        newObj1 = a;
        newObj2 = b;
    }

    return { newObj1, newObj2 }
}

module.exports = deepSorting;