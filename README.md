# Deep Sorting

Sorting function for arrays of objects.

### install

```
npm install @romanhavryliv/deep-sorting
```

### usage

```
import deepSorting from '@romanhavryliv/deep-sorting';
...

deepSorting(arrayToSort, arrayOfSortingCriteria)
```

- `arrayToSort` - an array that needs to be sorted (is sorted **in place**).
- `arrayOfSortingCriteria` - an array of sorting criteria. Criteria can be a **string**, a **function** or an **array** of two elements where the first one is criteria itself (a **string** or a **function**) and the second one is **descendic pointer**. This "descendic pointer" points to sort the array by this particular criteria using descendic order. "Descendic" pointer should be only **"desc"** string. Any other value is ignored.
  The _order_ of criteria in array is important for sorting order.

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

_String_ sorting criteria is a path in pupil object to the primitive that must be compared for sorting. _String_ criteria can begin either with **"."** (period) or without it. `'.name.firstName'` and `'name.firstName'` are equal.

Also it can start with **"["** (opening square bracket)

```
`[${name}].firstName`
```

If we want to sort pupils by name we should write next `'.name.firstName'`.
And our `arrayOfSortingCriteria` would look like next `arrayOfSortingCriteria = ['.name.firstName']`.
Or with descendic order: `arrayOfSortingCriteria = [['.name.firstName', 'desc']]`.

_Function_ sorting criteria is a function that return some primitive that can be compared for sorting.
If we want to sort pupils by number of marks in History we should create next function

```
const historyMarksNumber = (pupil) => pupil.marks.history.length;
```

_or with descendic order:_

```
const historyMarksNumber = (pupil) => [pupil.marks.history.length, 'desc'];
```

and `arrayOfSortingCriteria = [historyMarksNumber]`.

### What is the purpose of **DEEP** sorting?

According to examples above we can combine those sorting methods.

If we pass next `arrayOfSortingCriteria = ['.name.firstName', historyMarksNumber]` we can have such result as

| Name | History marks number |
| ---- | -------------------- |
| Adam | 8                    |
| Adam | 7                    |
| Adam | 5                    |
| Bob  | 7                    |
| Eric | 8                    |

Here we have three pupils with name _Adam_ and they are sorted by "History marks number" as well.

_Order of criteria in array is important for sorting order!_

For replaced criteria `arrayOfSortingCriteria = [historyMarksNumber, '.name.firstName']` result is

| Name | History marks number |
| ---- | -------------------- |
| Adam | 8                    |
| Eric | 8                    |
| Adam | 7                    |
| Bob  | 7                    |
| Adam | 5                    |

Now we have two pupils with "History marks number" of "8" and two of "7" and they are sorted by "firstName" as well (_inside_ of mark "8" and "7").

Let's see the second table with _descendic_ order for the second criteria `arrayOfSortingCriteria = [historyMarksNumber, ['.name.firstName', 'desc']]`:

| Name | History marks number |
| ---- | -------------------- |
| Eric | 8                    |
| Adam | 8                    |
| Bob  | 7                    |
| Adam | 7                    |
| Adam | 5                    |

Now we have descendic order of pupils by their firstName inside the list with the same "History marks number".

### Object complexity

The object (pupil) can be of any level of complexity combining objects and arrays inside.

Few more examples for _string_ criteria:

```
'.marks.arts[1]' - to sort pupils by "second mark of Arts".

`.marks[${subject}][1]` - to sort pupils by second mark of a "subject" passed as variable.
```

_Function_ complexity depends only on your needs.
The only thing it must do - _return a primitive_ for sorting comparison.

`arrayOfSortingCriteria` can contain only _strings_, only _functions_ or any _combination_ of those.

If an _empty array_ is passed as `arrayOfSortingCriteria` then regular sorting is applied (it doesn't change anything in array of objects).

### Change log (to v 1.1.0)

- fixed leading period issue
- added descentic order of sorting
- added typescript
