import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { getTokenInTurn } from "../../../redux/reducers/turnSlice";
import { getToken, cancelGetToken } from "../../../redux/reducers/tokenSlice";
import { getTokenUser } from "../../../redux/reducers/userSlice";
import MyToken from "../footer/myToken";
import MyButton from "./myButton";

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  font-family: "Gowun Batang", serif;
`;

const ModalContent = styled.div`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 60rem;
  height: 35rem;
  text-align: center;
  > .buttonContainer {
    margin: auto;
    margin-top: 3rem;
    display: flex;
    width: 20rem;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  color: black;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const TokenContainer = styled.div`
  display: flex;
  border: 3px solid black;
  border-radius: 20px;
  width: 40rem;
  height: 7rem;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  padding-top: 1.5rem;
  &.selectedToken {
    width: 20rem;
    height: 5rem;
    padding-top: 0;
  }
`;

function TokenModal({ open, onClose }) {
  const tokenInModal = useSelector((state) => state.tokens);
  const [selectedToken, setSelectedToken] = useState({});
  const [isTokenSelected, setIsTokenSelected] = useState(false);
  const dispatch = useDispatch();
  const turnInfo = useSelector((state) => state.turn);

  function tokenSelect(string) {
    if (string in selectedToken) {
      const newSelectedToken = Object.assign({}, selectedToken);
      const newTokenInModal = Object.assign({}, tokenInModal);
      newSelectedToken[string] += 1;
      newTokenInModal[string] -= 1;
      dispatch(getToken(newTokenInModal));
      setSelectedToken(newSelectedToken);
    } else {
      const newSelectedToken = Object.assign({}, selectedToken);
      const newTokenInModal = Object.assign({}, tokenInModal);
      newSelectedToken[string] = 1;
      newTokenInModal[string] -= 1;
      dispatch(getToken(newTokenInModal));
      setSelectedToken(newSelectedToken);
    }
    setIsTokenSelected(true);
  }

  function validateToken(string) {
    let sum = 0;
    let result = true;
    for (const key in selectedToken) {
      sum = sum + selectedToken[key];
      if (selectedToken[key] === 2) {
        result = false;
      } else if (sum >= 3) {
        result = false;
      }
    }
    for (const key in selectedToken) {
      if (sum === 2 && key === string) {
        result = string;
      }
    }
    return result;
  }

  function buttonDisabled(string) {
    if (
      tokenInModal[string] === 0 ||
      validateToken(string) === false ||
      string === "goldToken"
    ) {
      return true;
    } else if (selectedToken[string] === 1 && tokenInModal[string] < 3) {
      return true;
    } else if (validateToken(string) === string) {
      return true;
    }
    return false;
  }
  function handleConfirm() {
    dispatch(getTokenInTurn(selectedToken));
    dispatch(
      getTokenUser({ id: turnInfo.activatedPlayer, tokens: selectedToken })
    );
    setSelectedToken({});
    setIsTokenSelected(false);
    onClose();
  }
  function hadleCancel(e) {
    e.stopPropagation();
    dispatch(cancelGetToken(selectedToken));
    setSelectedToken({});
    setIsTokenSelected(false);
  }

  function hadleModalClose() {
    if (!isTokenSelected) {
      onClose();
    } else {
      dispatch(cancelGetToken(selectedToken));
      setSelectedToken({});
      setIsTokenSelected(false);
      onClose();
    }
  }

  if (!open) return null;
  return createPortal(
    <div onClick={(e) => e.stopPropagation()}>
      <ModalOverlay onClick={hadleModalClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalClose onClick={hadleModalClose}>&times;</ModalClose>{" "}
          <h1>토큰을 선택하고 확인버튼을 눌러주세요</h1>
          <TokenContainer>
            {Object.keys(tokenInModal).map((el) => {
              if (el !== "goldToken") {
                return (
                  <MyToken
                    key={el + "tokenInModal"}
                    number={tokenInModal[el]}
                    handleClick={() => {
                      tokenSelect(el);
                    }}
                    disabled={buttonDisabled(el)}
                    type={el}
                  />
                );
              } else {
                return null;
              }
            })}
          </TokenContainer>
          <div>
            <h2>선택한 토큰</h2>
            <TokenContainer className="selectedToken">
              {Object.keys(selectedToken).map((el) => {
                return (
                  <MyToken
                    key={el + "selectedToken"}
                    number={selectedToken[el]}
                    type={el}
                    disabled={false}
                  />
                );
              })}
            </TokenContainer>
          </div>
          <div className={"buttonContainer"}>
            <MyButton
              onClick={hadleCancel}
              disabled={!isTokenSelected}
              str={"취소"}
              canPlay={!isTokenSelected}
            />

            <MyButton
              onClick={handleConfirm}
              disabled={!isTokenSelected}
              str={"확인"}
              canPlay={!isTokenSelected}
            />
          </div>
        </ModalContent>
      </ModalOverlay>
    </div>,
    document.body
  );
}

export default TokenModal;
