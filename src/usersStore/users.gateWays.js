import axios from "axios";

const baseUrl = "https://api.github.com/repos";

export const fetchUsersList = (userName, value) => {
  return axios
    .get(`${baseUrl}/${userName}/issues?state=all&per_page=${value}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((error) => {
      console.error("Error fetching user's issues:", error);
      throw error;
    });
};

export const setDataToLocalStore = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromLocalStore = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
