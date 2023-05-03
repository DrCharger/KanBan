import { UserActionTypes } from "./users.actions";
import { UserState, ALLActions } from "../types/users.types";

const initialState: UserState = {
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

const usersReducer = (state = initialState, action: ALLActions): UserState => {
  switch (action.type) {
    case UserActionTypes.USERS_LIST_RECIEVED:
      return {
        ...state,
        filteredInfo: action.payload.correctColumns,
      };
    case UserActionTypes.URL_INFO:
      return {
        ...state,
        urlInfo: action.payload.data,
      };
    case UserActionTypes.REQUEST_NAME:
      return {
        ...state,
        reqName: action.payload.name,
      };
    case UserActionTypes.BAD_REQUEST:
      return {
        ...state,
        error: action.payload.status,
      };
    default:
      return state;
  }
};

export default usersReducer;
