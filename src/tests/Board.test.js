import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "../components/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { onDragEnd } from "../utilits/onDradEnd";
import { setDataToLocalStore } from "../usersStore/users.gateWays";
import "@testing-library/jest-dom";

jest.mock("../utilits/onDradEnd");
jest.mock("../usersStore/users.gateWays");

describe("Board component", () => {
  let props;
  let setColumnsMock;

  beforeEach(() => {
    setColumnsMock = jest.fn();
    props = {
      items: {
        todo: {
          name: "To do",
          items: [{ id: 1, title: "Item 1" }],
        },
        progress: {
          name: "In Progress",
          items: [{ id: 2, title: "Item 2" }],
        },
        done: {
          name: "Done",
          items: [{ id: 3, title: "Item 3" }],
        },
      },
      reqName: "test",
    };
  });

  it("should render a board with all columns and items", () => {
    const { getByText } = render(
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, props.items, props.reqName, setColumnsMock)
        }
      >
        <Board {...props} />
      </DragDropContext>
    );

    expect(getByText("To do")).toBeInTheDocument();
    expect(getByText("In Progress")).toBeInTheDocument();
    expect(getByText("Done")).toBeInTheDocument();

    expect(getByText("Item 1")).toBeInTheDocument();
    expect(getByText("Item 2")).toBeInTheDocument();
    expect(getByText("Item 3")).toBeInTheDocument();
  });

  it("should update state and local storage on item drag and drop", () => {
    const { getByTestId } = render(
      <DragDropContext onDragEnd={onDragEnd}>
        <Board {...props} />
      </DragDropContext>
    );

    const draggableItem = getByTestId("draggable-item-1");
    const droppableColumn = getByTestId("droppable-column-Done");

    fireEvent.dragStart(draggableItem);
    fireEvent.dragEnter(droppableColumn);
    fireEvent.dragOver(droppableColumn);
    fireEvent.drop(droppableColumn);
    fireEvent.dragEnd(draggableItem);

    expect(setDataToLocalStore).toHaveBeenCalledTimes(1);
    expect(setDataToLocalStore).toHaveBeenCalledWith(
      props.reqName,
      expect.any(Object)
    );
  });
});
