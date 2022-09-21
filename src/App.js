import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { colorCardAtom } from "./atom";
import Bottom from "./components/Bottom";
import ColorList from "./components/ColorList";

const Wrapper = styled.div`
  height: 100%;
`;

function App() {
  const [colorCard, setColorCard] = useRecoilState(colorCardAtom);
  const onDragEnd = (event) => {
    const { draggableId, destination, source } = event;
    console.log(event);
    if (event.combine) {
      if (
        event.draggableId.includes("+") ||
        event.combine.draggableId.includes("+")
      )
        return;
      const combineColor = `${event.draggableId}+${event.combine.draggableId}`;
      console.log(combineColor);
      setColorCard((colors) => {
        const removeColors = colors.filter(
          (item) =>
            item !== event.draggableId && item !== event.combine.draggableId
        );
        return [...removeColors, combineColor];
      });
    }
    if (!destination) return;
    if (destination.index !== source.index) {
      setColorCard((colors) => {
        const copyColors = [...colors];
        copyColors.splice(source.index, 1);
        copyColors.splice(destination.index, 0, draggableId);
        return copyColors;
      });
    }
  };
  return (
    <>
      <Wrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <ColorList />
        </DragDropContext>
        <Bottom />
      </Wrapper>
    </>
  );
}

export default App;
