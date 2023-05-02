import { Dispatch } from "redux";
import * as usersGateWays from "./users.gateWays";
import { BaseInfo, Columns } from "../types/users.types";
// import { usersSelector } from "./users.selectors";

export enum UserActionTypes {
  USERS_LIST_RECIEVED = "USERS_LIST_RECIEVED",
  URL_INFO = "OWNER_INFO",
}

export const setUrlInfo = (data: BaseInfo) => {
  return {
    type: UserActionTypes.URL_INFO,
    payload: {
      data,
    },
  };
};

export const usersListRecieved = (fullIssueList: any[]) => {
  const correctColumns: Columns = {
    todo: {
      name: "ToDo",
      items: fullIssueList.filter(
        (item) => item.state === "open" && item.assignee === null
      ),
    },
    progress: {
      name: "In Progress",
      items: fullIssueList.filter((item) => item.assignee !== null),
    },
    done: {
      name: "Done",
      items: fullIssueList.filter((item) => item.state === "closed"),
    },
  };
  return {
    type: UserActionTypes.USERS_LIST_RECIEVED,
    payload: {
      correctColumns,
    },
  };
};

export const getUsersList = (userName: string) => {
  const thunkAction = function (dispatch: Dispatch) {
    usersGateWays
      .fetchUsersList(userName)
      .then((userData) => dispatch(usersListRecieved(userData)));
  };

  return thunkAction;
};
