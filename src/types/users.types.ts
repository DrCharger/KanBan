import { UserActionTypes } from "../usersStore/users.actions";

export type Issue = {
  title: string;
  created_at: string;
  user: { login: string };
  login: string;
  comments: number;
  id: string;
  number: number;
  state: string;
  closed_at: string;
  assignee: string;
};

export type Column = {
  name: string;
  items: Issue[];
};

export type Columns = {
  todo: Column;
  progress: Column;
  done: Column;
};

export type BaseInfo = {
  owner: UrlInfo;
  repo: UrlInfo;
};

type UrlInfo = {
  name: string;
  url: string;
};

export interface UserState {
  filteredInfo: Columns;
  urlInfo: BaseInfo;
  reqName: string;
  error: string;
}

export interface UsersListAction {
  type: UserActionTypes.USERS_LIST_RECIEVED;
  payload: { correctColumns: Columns };
}

export interface UrlInfoAction {
  type: UserActionTypes.URL_INFO;
  payload: { data: BaseInfo };
}

export interface RequestNameAction {
  type: UserActionTypes.REQUEST_NAME;
  payload: {
    name: string;
  };
}

export interface BadRequestAction {
  type: UserActionTypes.BAD_REQUEST;
  payload: {
    status: string;
  };
}

export type ALLActions =
  | UsersListAction
  | UrlInfoAction
  | RequestNameAction
  | BadRequestAction;
