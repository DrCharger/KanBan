import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Header from "../components/home/Header";

describe("Header component", () => {
  const mockProps = {
    setUrlInfo: jest.fn(),
    getUsersList: jest.fn(),
    setCorrectColumns: jest.fn(),
    setRequestName: jest.fn(),
    setBadRequest: jest.fn(),
    urlInfo: { owner: { name: "", url: "" }, repo: { name: "", url: "" } },
    reqName: "",
    error: "",
  };

  it("renders the input and button", () => {
    render(<Header {...mockProps} />);
    expect(screen.getByPlaceholderText("Enter repo URl")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Load Issues" })
    ).toBeInTheDocument();
  });

  it("displays error message when URL is not valid", async () => {
    render(<Header {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Load Issues" }));
    await waitFor(() => {
      expect(
        screen.getByText("Please type correct url 'facebook/react'")
      ).toBeInTheDocument();
    });
  });

  it("calls the setUrlInfo and setRequestName function on valid input", async () => {
    render(<Header {...mockProps} />);
    const input = screen.getByPlaceholderText("Enter repo URl");
    fireEvent.change(input, {
      target: { value: "https://github.com/facebook/react" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Load Issues" }));
    await waitFor(() => {
      expect(mockProps.setUrlInfo).toHaveBeenCalledWith({
        owner: { name: "facebook", url: "https://github.com/facebook" },
        repo: { name: "react", url: "https://github.com/facebook/react" },
      });
    });
    await waitFor(() => {
      expect(mockProps.setRequestName).toHaveBeenCalledWith("facebook/react");
    });
  });

  it("calls the getUsersList function when data is not present in local storage", async () => {
    render(<Header {...mockProps} />);
    const input = screen.getByPlaceholderText("Enter repo URl");
    fireEvent.change(input, {
      target: { value: "https://github.com/facebook/react" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Load Issues" }));
    await waitFor(() => {
      expect(mockProps.getUsersList).toHaveBeenCalledWith("facebook/react", 30);
    });
  });

  it("opens the CustomModal when data is present in local storage", async () => {
    const spy = jest.spyOn(global, "localStorage", "get");
    spy.mockReturnValueOnce(
      JSON.stringify({ name: "facebook/react", data: ["issue1", "issue2"] })
    );
    render(<Header {...mockProps} />);
    const input = screen.getByPlaceholderText("Enter repo URl");
    fireEvent.change(input, {
      target: { value: "https://github.com/facebook/react" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Load Issues" }));
    await waitFor(() => {
      expect(mockProps.setAnswer).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    spy.mockRestore();
  });
});
