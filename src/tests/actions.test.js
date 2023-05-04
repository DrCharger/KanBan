import {
  setUrlInfo,
  setRequestName,
  setCorrectColumns,
  setBadRequest,
  getUsersList,
  UserActionTypes,
} from "../usersStore/users.actions";
import * as usersGateWays from "../usersStore/users.gateWays";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

describe("users actions", () => {
  it("should create an action to set the URL info", () => {
    const data = {
      owner: { name: "owner", url: "url" },
      repo: { name: "repo", url: "url" },
    };
    const expectedAction = {
      type: UserActionTypes.URL_INFO,
      payload: { data },
    };
    expect(setUrlInfo(data)).toEqual(expectedAction);
  });

  it("should create an action to set the request name", () => {
    const name = "request name";
    const expectedAction = {
      type: UserActionTypes.REQUEST_NAME,
      payload: { name },
    };
    expect(setRequestName(name)).toEqual(expectedAction);
  });

  it("should create an action to set the correct columns", () => {
    const correctColumns = {
      todo: { name: "ToDo", items: [] },
      progress: { name: "In Progress", items: [] },
      done: { name: "Done", items: [] },
    };
    const expectedAction = {
      type: UserActionTypes.USERS_LIST_RECIEVED,
      payload: { correctColumns },
    };
    expect(setCorrectColumns(correctColumns)).toEqual(expectedAction);
  });

  it("should create an action to set the bad request status", () => {
    const status = "Bad Request";
    const expectedAction = {
      type: UserActionTypes.BAD_REQUEST,
      payload: { status },
    };
    expect(setBadRequest(status)).toEqual(expectedAction);
  });
});
