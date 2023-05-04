import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchUsersList,
  setDataToLocalStore,
  getDataFromLocalStore,
} from "../usersStore/users.gateWays";

describe("users.gateWays module", () => {
  describe("fetchUsersList function", () => {
    const mockUserName = "facebook/react";
    const mockValue = 5;
    const mockResponseData = [
      { id: 1, title: "Mock issue 1" },
      { id: 2, title: "Mock issue 2" },
    ];

    it("should make a GET request to the correct API endpoint", async () => {
      const mockAxios = new MockAdapter(axios);
      mockAxios
        .onGet(
          `https://api.github.com/repos/${mockUserName}/issues?state=all&per_page=${mockValue}`
        )
        .reply(200, mockResponseData);

      await fetchUsersList(mockUserName, mockValue);

      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe(
        `https://api.github.com/repos/${mockUserName}/issues?state=all&per_page=${mockValue}`
      );

      mockAxios.restore();
    });

    it("should return the response data on success", async () => {
      const mockAxios = new MockAdapter(axios);
      mockAxios
        .onGet(
          `https://api.github.com/repos/${mockUserName}/issues?state=all&per_page=${mockValue}`
        )
        .reply(200, mockResponseData);

      const response = await fetchUsersList(mockUserName, mockValue);

      expect(response).toEqual(mockResponseData);

      mockAxios.restore();
    });

    it("should throw an error on failure", async () => {
      const mockAxios = new MockAdapter(axios);
      mockAxios
        .onGet(
          `https://api.github.com/repos/${mockUserName}/issues?state=all&per_page=${mockValue}`
        )
        .reply(500, "Server error");

      await expect(fetchUsersList(mockUserName, mockValue)).rejects.toThrow(
        "Request failed with status code 500"
      );

      mockAxios.restore();
    });
  });

  describe("setDataToLocalStore function", () => {
    const mockKey = "mockKey";
    const mockValue = [
      { id: 1, title: "Mock issue 1" },
      { id: 2, title: "Mock issue 2" },
    ];

    it("should set the correct data to local storage", () => {
      setDataToLocalStore(mockKey, mockValue);

      expect(localStorage.getItem(mockKey)).toBe(JSON.stringify(mockValue));
    });
  });

  describe("getDataFromLocalStore function", () => {
    const mockKey = "mockKey";
    const mockValue = [
      { id: 1, title: "Mock issue 1" },
      { id: 2, title: "Mock issue 2" },
    ];

    it("should return the correct data from local storage", () => {
      localStorage.setItem(mockKey, JSON.stringify(mockValue));
      const retrievedValue = getDataFromLocalStore(mockKey);

      expect(retrievedValue).toEqual(mockValue);
    });
  });
});
