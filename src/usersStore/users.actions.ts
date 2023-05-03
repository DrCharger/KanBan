import { Dispatch } from "redux";
import * as usersGateWays from "./users.gateWays";
import { BaseInfo, Columns } from "../types/users.types";
import { createColumns, cuttedInfo } from "src/utilits/utilits";

export enum UserActionTypes {
  USERS_LIST_RECIEVED = "USERS_LIST_RECIEVED",
  URL_INFO = "OWNER_INFO",
  REQUEST_NAME = "REQUEST_NAME",
  BAD_REQUEST = "BAD_REQUEST",
}

export const setUrlInfo = (data: BaseInfo) => {
  return {
    type: UserActionTypes.URL_INFO,
    payload: {
      data,
    },
  };
};

export const setRequestName = (name: string) => {
  return {
    type: UserActionTypes.REQUEST_NAME,
    payload: {
      name,
    },
  };
};

export const setCorrectColumns = (correctColumns: Columns) => {
  return {
    type: UserActionTypes.USERS_LIST_RECIEVED,
    payload: {
      correctColumns,
    },
  };
};

export const setBadRequest = (status: string) => {
  return {
    type: UserActionTypes.BAD_REQUEST,
    payload: {
      status,
    },
  };
};

const usersListRecieved = (fullIssueList: any[], key: string) => {
  const correctColumns = createColumns(cuttedInfo(fullIssueList));
  usersGateWays.setDataToLocalStore(key, correctColumns);
  return setCorrectColumns(correctColumns);
};

export const getUsersList = (userName: string, value: number) => {
  const thunkAction = function (dispatch: Dispatch) {
    usersGateWays
      .fetchUsersList(userName, value)
      .then((userData) => dispatch(usersListRecieved(userData, userName)))
      .catch((error) =>
        dispatch(setBadRequest(error.name + ": " + error.message))
      );
  };

  return thunkAction;
};
