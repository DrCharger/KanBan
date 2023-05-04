import { onDragEnd } from "../utilits/onDradEnd";
import { setDataToLocalStore } from "../usersStore/users.gateWays";

jest.mock("../usersStore/users.gateWays", () => ({
  setDataToLocalStore: jest.fn(),
}));

describe("onDragEnd", () => {
  const result = {
    destination: { droppableId: "todo", index: 0 },
    source: { droppableId: "progress", index: 0 },
  };

  const columns = {
    todo: {
      name: "To do",
      items: [{ id: 1, name: "Item 1" }],
    },
    progress: {
      name: "In Progress",
      items: [{ id: 2, name: "Item 2" }],
    },
    done: {
      name: "Done",
      items: [{ id: 3, name: "Item 3" }],
    },
  };

  const setColumns = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should move item between columns and update state and localStorage", () => {
    const name = "test";
    const expected = {
      todo: {
        name: "To do",
        items: [
          { id: 2, name: "Item 2" },
          { id: 1, name: "Item 1" },
        ],
      },
      progress: {
        name: "In Progress",
        items: [],
      },
      done: {
        name: "Done",
        items: [{ id: 3, name: "Item 3" }],
      },
    };

    onDragEnd(result, columns, name, setColumns);

    expect(setColumns).toHaveBeenCalledWith(expected);
    expect(setDataToLocalStore).toHaveBeenCalledWith(name, expected);
  });

  it("should move item within the same column and update state and localStorage", () => {
    const name = "test";
    const result = {
      destination: { droppableId: "progress", index: 1 },
      source: { droppableId: "progress", index: 0 },
    };
    const expected = {
      todo: {
        name: "To do",
        items: [{ id: 1, name: "Item 1" }],
      },
      progress: {
        name: "In Progress",
        items: [{ id: 2, name: "Item 2" }],
      },
      done: {
        name: "Done",
        items: [{ id: 3, name: "Item 3" }],
      },
    };

    onDragEnd(result, columns, name, setColumns);

    expect(setColumns).toHaveBeenCalledWith(expected);
    expect(setDataToLocalStore).toHaveBeenCalledWith(name, expected);
  });

  it("should not update state or localStorage if there is no destination", () => {
    const name = "test";

    onDragEnd({ ...result, destination: null }, columns, name, setColumns);

    expect(setColumns).not.toHaveBeenCalled();
    expect(setDataToLocalStore).not.toHaveBeenCalled();
  });
});
