import { BoardProps } from "../types/prop.types";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Container, Flex, Issue } from "./home/HomeRoter.styled";
import Card from "./Card";
import { onDragEnd } from "src/utilits/onDradEnd";

const Board: React.FC<BoardProps> = ({ items, reqName }) => {
  const [colums, setColums] = useState(items);

  useEffect(() => {
    setColums(items);
  }, [items]);

  return (
    <Flex justify="center">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, colums, reqName, setColums)}
      >
        {Object.entries(colums).map(([id, column]) => {
          return (
            <Flex row="column" align="center" key={id}>
              <h4>{column.name}</h4>
              <Flex margin="15px">
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <Container
                        back={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        data-testid={`droppable-column-${column.name}`}
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
                                  <Issue
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    back={snapshot.isDragging}
                                    draggableStyle={{
                                      ...provided.draggableProps.style,
                                    }}
                                    data-testid={`draggable-item-${item.id}`}
                                  >
                                    <Card item={item} />
                                  </Issue>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </Container>
                    );
                  }}
                </Droppable>
              </Flex>
            </Flex>
          );
        })}
      </DragDropContext>
    </Flex>
  );
};

export default Board;
