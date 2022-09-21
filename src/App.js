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
