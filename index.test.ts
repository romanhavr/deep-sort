import deepSorting from "./src/index";

const adamSmith = {
  isActive: true,
  pupil: {
    firstName: "Adam",
    lastName: "Smith",
    age: 12,
  },
  marks: {
    language: ["A", "B", "A", "C", "A"],
    math: ["B", "A", "A", "A", "A"],
  }
};

const adamPotter = {
  isActive: true,
  pupil: {
    firstName: "Adam",
    lastName: "Potter",
    age: 13,
  },
  marks: {
    language: ["A", "B", "B", "C", "A"],
    math: ["C", "A", "A", "A"],
  }
};

const johnSmith = {
  isActive: false,
  pupil: {
    firstName: "John",
    lastName: "Smith",
    age: 13,
  },
  marks: {
    language: ["A", "B", "A", "C", "A"],
    math: ["A", "A", "A"],
  }
};

const emmaRock = {
  isActive: true,
  pupil: {
    firstName: "Emma",
    lastName: "Rock",
    age: 12,
  },
  marks: {
    language: ["A", "B", "D", "C", "A"],
    math: ["D", "A"],
  }
};

const lisaQueen = {
  isActive: true,
  pupil: {
    firstName: "Lisa",
    lastName: "Queen",
    age: 13,
  },
  marks: {
    language: ["A", "B", "C", "C", "A"],
    math: ["C"],
  }
};

let journals: (typeof adamSmith)[];

describe("Test deepSorting function", () => {
  describe("Ascendic sorting", () => {
    beforeEach(() => {
      journals = [
        adamSmith,
        adamPotter,
        johnSmith,
        emmaRock,
        lisaQueen
      ]
    })

    test("without sorting criteria", () => {
      deepSorting(journals);
      expect(journals).toEqual([
        adamSmith,
        adamPotter,
        johnSmith,
        emmaRock,
        lisaQueen
      ])
    });

    test("with empty sorting criteria array", () => {
      deepSorting(journals, []);
      expect(journals).toEqual([
        adamSmith,
        adamPotter,
        johnSmith,
        emmaRock,
        lisaQueen
      ])
    });

    test("with invalid sorting criteria (wrong path)", () => {
      deepSorting(journals, ["qwerty"]);
      expect(journals).toEqual([
        adamSmith,
        adamPotter,
        johnSmith,
        emmaRock,
        lisaQueen
      ])
    });

    test("with invalid sorting criteria (wrong path at 2nd level)", () => {
      deepSorting(journals, ["pupil.qwerty"]);
      expect(journals).toEqual([
        adamSmith,
        adamPotter,
        johnSmith,
        emmaRock,
        lisaQueen
      ])
    });

    test("with invalid sorting criteria (undefined)", () => {
      deepSorting(journals, [undefined]);
      expect(journals).toEqual([
        adamSmith,
        adamPotter,
        johnSmith,
        emmaRock,
        lisaQueen
      ])
    });

    test("sort by 1st level (with leading dot symbol)", () => {
      deepSorting(journals, [".isActive"]);
      expect(journals).toEqual([
        johnSmith,
        adamSmith,
        adamPotter,
        emmaRock,
        lisaQueen,
      ])
    });

    test("sort by 1st level (without leading dot symbol)", () => {
      deepSorting(journals, ["isActive"]);
      // "false" goes before "true" while sorting
      expect(journals).toEqual([
        johnSmith,
        adamSmith,
        adamPotter,
        emmaRock,
        lisaQueen,
      ])
    });

    test("sort by 2nd level", () => {
      deepSorting(journals, [".pupil.age"]);
      expect(journals).toEqual([
        adamSmith,
        emmaRock,
        adamPotter,
        johnSmith,
        lisaQueen
      ])
    });

    test("sort using bracket notation in array", () => {
      deepSorting(journals, [".marks.language[2]"]);
      expect(journals).toEqual([
        adamSmith,
        johnSmith,
        adamPotter,
        lisaQueen,
        emmaRock,
      ])
    });

    test("sort using variable in path", () => {
      const subject = "language";
      deepSorting(journals, [`.marks[${subject}][2]`]);
      expect(journals).toEqual([
        adamSmith,
        johnSmith,
        adamPotter,
        lisaQueen,
        emmaRock,
      ])
    });

    test("sort using leading open bracket", () => {
      const status = "isActive";
      deepSorting(journals, [`[${status}]`]);
      expect(journals).toEqual([
        johnSmith,
        adamSmith,
        adamPotter,
        emmaRock,
        lisaQueen,
      ])
    });

    test("sort using leading open bracket and following next path", () => {
      const pupil = "pupil";
      deepSorting(journals, [`[${pupil}].firstName`]);
      expect(journals).toEqual([
        adamSmith,
        adamPotter,
        emmaRock,
        johnSmith,
        lisaQueen,
      ])
    });

    test("sort using function", () => {
      deepSorting(journals, [({marks}) => marks.math.length]);
      expect(journals).toEqual([
        lisaQueen,
        emmaRock,
        johnSmith,
        adamPotter,
        adamSmith,
      ])
    });

    test("sort using two criterias (function + function)", () => {
      deepSorting(journals, [ ({pupil}) => pupil.lastName === "Smith", ({marks}) => marks.math[0]]);
      expect(journals).toEqual([
        adamPotter,
        lisaQueen,
        emmaRock,
        johnSmith,
        adamSmith,
      ])
    });

    test("sort using two criterias (function + string)", () => {
      deepSorting(journals, [ ({pupil}) => pupil.lastName === "Smith", "marks.math[0]"]);
      expect(journals).toEqual([
        adamPotter,
        lisaQueen,
        emmaRock,
        johnSmith,
        adamSmith,
      ])
    });

    test("sort using two criterias (string + string)", () => {
      deepSorting(journals, [ "pupil.lastName", "marks.math[0]"]);
      expect(journals).toEqual([
        adamPotter,
        lisaQueen,
        emmaRock,
        johnSmith,
        adamSmith,
      ])
    });
  });

  describe("Descendic sorting", () => {
    beforeEach(() => {
      journals = [
        adamSmith,
        adamPotter,
        johnSmith,
        emmaRock,
        lisaQueen
      ]
    })

    test("sort by 1st level with wrong descendic pointer", () => {
      deepSorting(journals, [[".isActive", "df"]]);
      expect(journals).toEqual([
        johnSmith,
        adamSmith,
        adamPotter,
        emmaRock,
        lisaQueen,
      ])
    });

    test("sort by 1st level with correct descendic pointer", () => {
      deepSorting(journals, [[".isActive", "desc"]]);
      expect(journals).toEqual([
        adamSmith,
        adamPotter,
        emmaRock,
        lisaQueen,
        johnSmith,
      ])
    });

    test("sort using function with correct descendic pointer", () => {
      deepSorting(journals, [[({marks}) => marks.math.length, "desc"]]);
      expect(journals).toEqual([
        adamSmith,
        adamPotter,
        johnSmith,
        emmaRock,
        lisaQueen,
      ])
    });

    test("sort using two criterias (function + function) with descendic order for the second one", () => {
      deepSorting(journals, [ ({pupil}) => pupil.lastName === "Smith", [({marks}) => marks.math[0], "desc"]]);
      expect(journals).toEqual([
        emmaRock,
        adamPotter,
        lisaQueen,
        adamSmith,
        johnSmith,
      ])
    });

    test("sort using two criterias (function + string) with descendic order for the second one", () => {
      deepSorting(journals, [ ({pupil}) => pupil.lastName === "Smith", ["marks.math[0]", "desc"]]);
      expect(journals).toEqual([
        emmaRock,
        adamPotter,
        lisaQueen,
        adamSmith,
        johnSmith,
      ])
    });
  });
})