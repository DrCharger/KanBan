import { setDataToLocalStore } from "src/usersStore/users.gateWays";
import { Columns } from "../types/users.types";
import { DropResult } from "react-beautiful-dnd";

export const onDragEnd = (
  result: DropResult,
  columns: any,
  name: string,
  setColumns: (prevState: Columns) => void
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  let data;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    data = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    };
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    data = {
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    };
  }
  setColumns(data);
  setDataToLocalStore(name, data);
};
