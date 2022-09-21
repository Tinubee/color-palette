import { faCopy, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { colorCardAtom } from "../atom";
import { IconContainer } from "./Bottom";

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    45deg,
    ${(props) => props.color},
    ${(props) => props.color2}
  );
  width: 100%;
  height: 100%;
`;

const CardInfoContainer = styled.div`
  padding: 12px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 21px;
  user-select: none;
`;

const ColorText = styled.div``;

function ColorCard({ color, color2, index }) {
  const setColorCard = useSetRecoilState(colorCardAtom);
  const deleteColor = () => {
    setColorCard((colors) => {
      const deleteColor = color !== color2 ? `${color}+${color2}` : color;
      return colors.filter((item) => item !== deleteColor);
    });
  };

  return (
    <Draggable
      draggableId={color !== color2 ? `${color}+${color2}` : color}
      index={index}
      key={color !== color2 ? `${color}+${color2}` : color}
    >
      {(magic) => (
        <Card
          color={color}
          color2={color2}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <CardInfoContainer>
            <ColorText>
              {color !== color2 ? `${color}+${color2}` : color}
            </ColorText>
            <IconContainer>
              <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
              <FontAwesomeIcon
                onClick={deleteColor}
                icon={faTrashCan}
              ></FontAwesomeIcon>
            </IconContainer>
          </CardInfoContainer>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(ColorCard);
