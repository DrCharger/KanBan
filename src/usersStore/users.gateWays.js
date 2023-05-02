import axios from "axios";

const baseUrl = "https://api.github.com/repos";

export const fetchUsersList = (userName) => {
  return axios.get(`${baseUrl}/${userName}/issues?state=all`).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  });
};
