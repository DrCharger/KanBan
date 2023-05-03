import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../components/Board";

describe("Board", () => {
  const items = {
    column1: {
      name: "Column 1",
      items: [
        {
          id: 1,
          title: "Issue 1",
          number: 123,
          state: "open",
          created_at: "2022-05-01T10:00:00Z",
          closed_at: null,
          login: "user1",
          comments: 3,
        },
        {
          id: 2,
          title: "Issue 2",
          number: 124,
          state: "closed",
          created_at: "2022-04-01T10:00:00Z",
          closed_at: "2022-04-10T10:00:00Z",
          login: "user2",
          comments: 2,
        },
      ],
    },
    column2: {
      name: "Column 2",
      items: [],
    },
  };

  it("should render board with correct columns and items", () => {
    render(<Board items={items} reqName={"test"} />);
    const column1Title = screen.getByText("Column 1");
    const column2Title = screen.getByText("Column 2");
    expect(column1Title).toBeInTheDocument();
    expect(column2Title).toBeInTheDocument();
    const issue1Title = screen.getByText("Issue 1");
    const issue2Title = screen.getByText("Issue 2");
    expect(issue1Title).toBeInTheDocument();
    expect(issue2Title).toBeInTheDocument();
  });

  it("should render no items if column is empty", () => {
    render(<Board items={items} reqName={"test"} />);
    const column2Title = screen.getByText("Column 2");
    expect(column2Title).toBeInTheDocument();
    const noItemsMessage = screen.queryByText("No items in this column");
    expect(noItemsMessage).toBeInTheDocument();
  });

  it("should show full title on hover", () => {
    render(<Board items={items} reqName={"test"} />);
    const issue1Title = screen.getByText("Issue 1");
    expect(issue1Title).toBeInTheDocument();
    expect(issue1Title).not.toHaveClass("tooltip");
    fireEvent.mouseEnter(issue1Title);
    const fullTitle = screen.getByText("Issue 1");
    expect(fullTitle).toBeInTheDocument();
    expect(fullTitle).toHaveClass("tooltip");
  });
});
