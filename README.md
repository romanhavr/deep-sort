# Deep Sorting

Sorting function for arrays of objects.

### install

```
npm install deep-sorting
```

### usage

```
import deepSorting from 'deep-sorting';
...

deepSorting(arrayToSort, arrayOfSortingCriteria)
```
 - `arrayToSort` - an array that needs to be sorted (is sorted **in place**).
 - `arrayOfSortingCriteria` - an array of sorting criteria. Criteria can be a **string** or a **function**. The *order* of criteria in array is important for sorting order.

### examples

For example we have a database of pupils as an array of objects `pupils = [pupil1, pupil2, pupil3, ...]`.
And we have next structure of our objects (pupil1, pupil2, pupil3, ...):
```
{
  name: {
    firstName,
    lastName,
  },
  marks: {
    history, // e.g. [A, A, B, D, A],
    arts, // e.g. [A, A, A],
  },
}
```
*String* sorting criteria is a path in pupil object to the primitive that must be compared for sorting. *String* criteria must begin with **"."** (period) or **"["** (opening square bracket).
If we want to sort pupils by name we should write next `'.name.firstName'`.
And our `arrayOfSortingCriteria` would look like next `arrayOfSortingCriteria = ['.name.firstName']`.

*Function* sorting criteria is a function that return some primitive that can be compared for sorting.
If we want to sort pupils by number of marks in History we should create next function
```
const historyMarksNumber = (pupil) => pupil.marks.history.length;
```
and `arrayOfSortingCriteria = [historyMarksNumber]`.

What is the purpose of **DEEP** sorting?

According to examples above we can combine those sorting methods.
If we pass next `arrayOfSortingCriteria = ['.name.firstName', historyMarksNumber]` we can have such result as

| Name | History marks number |
| ---- | ----- |
| Adam | 8 |
| Adam | 7 |
| Adam | 5 |
| Bob | 7 |
| Eric | 8 |

Here we have three pupils with name *Adam* and they are sorted by "History marks number" as well.

*Order of criteria in array is important for sorting order!*
For replaced criteria `arrayOfSortingCriteria = [historyMarksNumber, '.name.firstName']` result is

| Name | History marks number |
| ---- | ----- |
| Adam | 8 |
| Eric | 8 |
| Adam | 7 |
| Bob | 7 |
| Adam | 5 |

Now we have two pupils with "History marks number" of "8" and two of "7" and they are sorted by "firstName" as well (*inside* of mark "8" and "7").

### Object complexity

The object (pupil) can be of any level of complexity combining objects and arrays inside.

Few more examples for *string* criteria:
```
'.marks.arts[2]'` - to sort pupils by "second mark of Arts".

`.marks[${subject}][2]` - to sort pupils by second mark of a "subject" passed as variable.
```

*Function* complexity depends only on your needs.
The only thing it must do - *return a primitive* for sorting comparison.

`arrayOfSortingCriteria` can contain only *strings*, only *functions* or any *combination* of those.

If an *empty array* is passed as `arrayOfSortingCriteria` then regular sorting is applied (it doesn't change anything in array of objects).