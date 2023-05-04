import usersReducer from "../usersStore/users.reducer";
import { UserActionTypes } from "../usersStore/users.actions";

describe("usersReducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      filteredInfo: {
        todo: {
          name: "ToDo",
          items: [],
        },
        progress: {
          name: "In Progress",
          items: [],
        },
        done: {
          name: "Done",
          items: [],
        },
      },
      urlInfo: { owner: { name: "", url: "" }, repo: { name: "", url: "" } },
      reqName: "",
      error: "",
    };
  });

  it("should return the initial state", () => {
    expect(usersReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle USERS_LIST_RECIEVED", () => {
    const correctColumns = {
      todo: {
        name: "ToDo",
        items: [{ id: 1, title: "Item 1" }],
      },
      progress: {
        name: "In Progress",
        items: [{ id: 2, title: "Item 2" }],
      },
      done: {
        name: "Done",
        items: [{ id: 3, title: "Item 3" }],
      },
    };

    const action = {
      type: UserActionTypes.USERS_LIST_RECIEVED,
      payload: { correctColumns },
    };

    const expectedState = {
      ...initialState,
      filteredInfo: correctColumns,
    };

    expect(usersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle URL_INFO", () => {
    const data = {
      owner: { name: "testUser", url: "https://github.com/testUser" },
      repo: { name: "testRepo", url: "https://github.com/testUser/testRepo" },
    };

    const action = {
      type: UserActionTypes.URL_INFO,
      payload: { data },
    };

    const expectedState = {
      ...initialState,
      urlInfo: data,
    };

    expect(usersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle REQUEST_NAME", () => {
    const name = "testUser";

    const action = {
      type: UserActionTypes.REQUEST_NAME,
      payload: { name },
    };

    const expectedState = {
      ...initialState,
      reqName: name,
    };

    expect(usersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle BAD_REQUEST", () => {
    const status = "404";

    const action = {
      type: UserActionTypes.BAD_REQUEST,
      payload: { status },
    };

    const expectedState = {
      ...initialState,
      error: status,
    };

    expect(usersReducer(initialState, action)).toEqual(expectedState);
  });
});
