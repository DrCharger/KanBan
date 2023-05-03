import moment from "moment";
import { Columns, Issue } from "../types/users.types";

export const correctUrl = (url: string) => {
  const baseURl = "https://github.com/";
  const fullname = url.split(baseURl).join("");
  const splitArr = fullname.split("/");
  if (!splitArr[1]) return { fullname: null, result: null };
  const result = {
    owner: { name: splitArr[0], url: baseURl + splitArr[0] },
    repo: { name: splitArr[1], url: baseURl + fullname },
  };
  return {
    fullname,
    result,
  };
};

export const correctName = (name: string) =>
  name
    .split("")
    .map((el, id) => (id === 0 ? el.toUpperCase() : el))
    .join("");

export const dateToDays = (date: string) => moment(date).fromNow();

export const cuttedInfo = (data: any[]) =>
  data.map((elem: Issue) => {
    return {
      id: elem.id.toString(),
      title: elem.title,
      number: elem.number,
      state: elem.state,
      created_at: elem.created_at,
      closed_at: elem.closed_at,
      comments: elem.comments,
      login: elem.user.login,
      assignee: elem.assignee,
    };
  });

export const createColumns = (data: any[]) => {
  const result: Columns = {
    todo: {
      name: "ToDo",
      items: data.filter(
        (item) => item.state === "open" && item.assignee === null
      ),
    },
    progress: {
      name: "In Progress",
      items: data.filter(
        (item) => item.state === "open" && item.assignee !== null
      ),
    },
    done: {
      name: "Done",
      items: data.filter((item) => item.state === "closed"),
    },
  };
  return result;
};
