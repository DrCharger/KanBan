import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../components/Card";

describe("Card", () => {
  const testIssue = {
    title: "Test Issue Title",
    number: 1,
    state: "open",
    created_at: "2022-05-01T00:00:00Z",
    closed_at: null,
    login: "testuser",
    comments: 5,
  };

  it("renders card content correctly", () => {
    const { getByText } = render(<Card item={testIssue} />);
    expect(getByText(testIssue.title)).toBeInTheDocument();
    expect(
      getByText(`#${testIssue.number} ${testIssue.state}`)
    ).toBeInTheDocument();
    expect(
      getByText(`${testIssue.login} | Comments: ${testIssue.comments}`)
    ).toBeInTheDocument();
  });

  it("shows correct state text", () => {
    const { getByText } = render(<Card item={testIssue} />);

    expect(getByText(`opened a year ago`)).toBeInTheDocument();

    const closedIssue = {
      ...testIssue,
      state: "closed",
      closed_at: "2022-05-03T00:00:00Z",
    };
    render(<Card item={closedIssue} />);
    expect(getByText(`closed a year ago`)).toBeInTheDocument();
  });

  it("shows title when hovered", () => {
    const { getByText, queryByText } = render(<Card item={testIssue} />);
    expect(queryByText(testIssue.title)).toBeInTheDocument();
    fireEvent.mouseEnter(getByText(testIssue.title));
    expect(getByText(testIssue.title)).toHaveStyle({
      "white-space": "wrap",
    });

    fireEvent.mouseLeave(getByText(testIssue.title));
    expect(queryByText(testIssue.title)).toHaveStyle({
      "white-space": "nowrap",
    });
  });
});
