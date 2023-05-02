import moment from "moment";

export const correctUrl = (data: string) => {
  const baseURl = "https://github.com/";
  const split = data.split(baseURl).join("");
  const splitArr = split.split("/");
  const result = {
    owner: { name: splitArr[0], url: baseURl + splitArr[0] },
    repo: { name: splitArr[1], url: baseURl + data },
  };
  return {
    split,
    result,
  };
};

export const correctName = (name: string) =>
  name
    .split("")
    .map((el, id) => (id === 0 ? el.toUpperCase() : el))
    .join("");

export const dateToDays = (date: string) => {
  return moment(date).fromNow();
};
