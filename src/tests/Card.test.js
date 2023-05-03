import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "../components/Card";

const testIssue = {
  title: "Test Issue",
  number: 123,
  state: "open",
  created_at: "2021-05-01T12:00:00Z",
  closed_at: null,
  login: "testuser",
  comments: 2,
};

describe("Card", () => {
  it("renders card content correctly", () => {
    render(<Card item={testIssue} />);
    expect(screen.getByText(testIssue.title)).toBeInTheDocument();
    expect(
      screen.getByText(`#${testIssue.number} ${testIssue.state}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`testuser | Comments: 2`)).toBeInTheDocument();
  });
});
