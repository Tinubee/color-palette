import {
  faCopy,
  faRepeat,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { colorCardAtom } from "../atom";
import { IconContainer } from "./Bottom";

const Card = styled.div`
  background: linear-gradient(
    45deg,
    ${(props) => props.color},
    ${(props) => props.color2}
  );
  width: 100%;
  height: 100%;
`;

const CardBigBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CardInfoContainer = styled(motion.div)`
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 28px;
  user-select: none;
`;

const CopyContainer = styled(CardInfoContainer)`
  padding: 40px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: greenyellow;
  font-size: 22px;
  user-select: none;
`;

const ColorText = styled.div``;

const boxVariants = {
  start: { opacity: 0 },
  hover: {
    opacity: 1,
  },
};

function ColorCard({ color, color2, index }) {
  const setColorCard = useSetRecoilState(colorCardAtom);
  const formRef = useRef();
  const [isCopy, setIsCopy] = useState(false);
  const deleteColor = () => {
    setColorCard((colors) => {
      const deleteColor = color !== color2 ? `${color}+${color2}` : color;
      return colors.filter((item) => item !== deleteColor);
    });
  };

  const separateColor = () => {
    setColorCard((colors) => {
      if (color !== color2 && colors.length > 4) {
        return [...colors];
      }
      const targetColor = color !== color2 ? `${color}+${color2}` : color;
      const arrayColor = colors.filter((item) => item !== targetColor);
      return [...arrayColor, color, color2];
    });
  };

  const handleCopy = () => {
    const text = formRef.current.innerText;
    navigator.clipboard.writeText(text);
    setIsCopy(true);
    setInterval(() => {
      setIsCopy(false);
    }, 3000);
  };

  return (
    <Draggable
      draggableId={color !== color2 ? `${color}+${color2}` : color}
      index={index}
      key={color !== color2 ? `${color}+${color2}` : color}
    >
      {(magic, snapshot) => (
        <Card
          color={color}
          color2={color2}
          combineWith={snapshot.combineWith}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <CardBigBox variants={boxVariants} initial="start" whileHover="hover">
            {isCopy ? (
              <CopyContainer>복사완료 !</CopyContainer>
            ) : (
              <CardInfoContainer>
                <ColorText ref={formRef}>
                  {color !== color2 ? `${color}+${color2}` : color}
                </ColorText>
                <IconContainer>
                  <FontAwesomeIcon
                    onClick={handleCopy}
                    icon={faCopy}
                  ></FontAwesomeIcon>
                  {color !== color2 ? (
                    <FontAwesomeIcon
                      onClick={separateColor}
                      icon={faRepeat}
                    ></FontAwesomeIcon>
                  ) : null}
                  <FontAwesomeIcon
                    onClick={deleteColor}
                    icon={faTrashCan}
                  ></FontAwesomeIcon>
                </IconContainer>
              </CardInfoContainer>
            )}
          </CardBigBox>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(ColorCard);
