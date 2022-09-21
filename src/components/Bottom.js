import { faPlus, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { colorCardAtom } from "../atom";

const Wrapper = styled.div`
  height: 30vh;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color linear 1s;
`;

const Btn = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 28px;
  user-select: none;
`;

const BtnText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  svg {
    cursor: pointer;
    &:hover {
      color: greenyellow;
      font-size: 28px;
    }
  }
`;

function Bottom() {
  const [color, setColor] = useState();
  const setColorCard = useSetRecoilState(colorCardAtom);
  const setRandomColor = () => {
    const color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
    setColor(color);
  };

  const setSaveColor = () => {
    setColorCard((colors) => {
      if (colors.length === 5) return [...colors];
      const exist = colors.find((item) => item === color);
      if (!exist) return [...colors, color];
      return [...colors];
    });
  };

  useEffect(() => setRandomColor(), []);

  return (
    <Wrapper color={color}>
      <Btn>
        <BtnText>
          <span>{color}</span>
          <IconContainer>
            <FontAwesomeIcon
              onClick={setRandomColor}
              icon={faRepeat}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              onClick={setSaveColor}
              icon={faPlus}
            ></FontAwesomeIcon>
          </IconContainer>
        </BtnText>
      </Btn>
    </Wrapper>
  );
}

export default Bottom;
