import { Columns } from "../types/users.types";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { dateToDays } from "src/utilits/utilits";

type DNDProps = {
  items: Columns;
};

const onDragEnd = (
  result: DropResult,
  columns: {
    [x: string]: any;
    todosfvger12312312312?: {
      name: string;
      items: { id: string; content: string }[];
    };
  },
  setColumns: any
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const DND: React.FC<DNDProps> = ({ items }) => {
  const [colums, setColums] = useState(items);

  console.log(colums);
  useEffect(() => {
    setColums(items);
  }, [items]);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, colums, setColums)}
      >
        {Object.entries(colums).map(([id, column]) => {
          return (
            <div
              key={id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: "8px" }}>
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 700,
                        }}
                      >
                        {column.items.map((item, index) => {
                          if (column.items.length === 0) return null;
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                      borderRadius: "20px",
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <span
                                      style={{
                                        textOverflow: "ellipsis",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {item.title}
                                    </span>
                                    <div>
                                      #{item.number}{" "}
                                      {item.state === "open"
                                        ? `opened ${dateToDays(
                                            item.created_at
                                          )}`
                                        : `closed ${dateToDays(
                                            item.closed_at
                                          )}`}
                                    </div>
                                    <div>
                                      {item.user.login} | Comments:{" "}
                                      {item.comments}
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default DND;
