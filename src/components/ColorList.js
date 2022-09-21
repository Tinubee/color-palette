import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { colorCardAtom } from "../atom";
import ColorCard from "./ColorCard";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-items: center;
  height: 70vh;
`;

function ColorList() {
  const setColors = useRecoilValue(colorCardAtom);
  return (
    <Droppable droppableId="colors" direction="horizontal" isCombineEnabled>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          {setColors.map((color, index) => (
            <ColorCard
              key={color}
              color={color.split("+")[0]}
              color2={color.includes("+") ? color.split("+")[1] : color}
              index={index}
            />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default ColorList;
