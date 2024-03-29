import styled from "styled-components";
import Tile from "./tile";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTile } from "../../../redux/reducers/tileSlice";
import { getTileUser } from "../../../redux/reducers/userSlice";
import {
  getTileInTurn,
  notGetTileInTurn,
} from "../../../redux/reducers/turnSlice";

const TilesWrap = styled.div`
  width: 10%;
  height: 80%;
  margin: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-right: 8rem;
`;

const TilesTopWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const TilesMiddleWrap = styled.div`
  display: flex;
`;
const TilesBottomWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const DummyTile = styled.div`
  border-radius: 10%;
  height: 5rem;
  width: 5rem;
  border: dashed;
`;

function Tiles() {
  const tileOnBoard = useSelector((state) => state.tile);
  const tileCheck = useSelector((state) => state.turn.canPlay);
  const activatedPlayer = useSelector((state) => state.turn.activatedPlayer);
  const userInfo = useSelector((state) => state.user[activatedPlayer - 1]);

  const dispatch = useDispatch();

  function canGetTile(tileArr, cardsObj) {
    for (let i = 0; i < tileArr.length; i++) {
      if (tileArr[i]) {
        let cost = tileArr[i].cost;
        let check = true;
        for (let j in cost) {
          if (cardsObj[j].length < cost[j]) {
            check = false;
          }
        }
        if (check) {
          return i;
        }
      }
    }
    return;
  }

  useEffect(() => {
    const tileIdx = canGetTile(tileOnBoard, userInfo.cards);
    const payload = { activatedPlayer, tile: tileOnBoard[tileIdx] };
    if (tileIdx !== undefined) {
      dispatch(getTileUser(payload));
      dispatch(getTileInTurn(payload));
      dispatch(getTile(tileIdx));
    } else {
      dispatch(notGetTileInTurn());
    }
  }, [tileCheck]);

  return (
    <TilesWrap>
      {tileOnBoard[0] ? (
        <Tile
          key={tileOnBoard[0].id}
          score={tileOnBoard[0].score}
          cost={tileOnBoard[0].cost}
          image={tileOnBoard[0].image}
        />
      ) : (
        <DummyTile />
      )}
      {tileOnBoard[1] ? (
        <Tile
          key={tileOnBoard[1].id}
          score={tileOnBoard[1].score}
          cost={tileOnBoard[1].cost}
          image={tileOnBoard[1].image}
        />
      ) : (
        <DummyTile />
      )}
      {tileOnBoard[2] ? (
        <Tile
          key={tileOnBoard[2].id}
          score={tileOnBoard[2].score}
          cost={tileOnBoard[2].cost}
          image={tileOnBoard[2].image}
        />
      ) : (
        <DummyTile />
      )}
      {tileOnBoard[3] ? (
        <Tile
          key={tileOnBoard[3].id}
          score={tileOnBoard[3].score}
          cost={tileOnBoard[3].cost}
          image={tileOnBoard[3].image}
        />
      ) : (
        <DummyTile />
      )}
      {tileOnBoard[4] ? (
        <Tile
          key={tileOnBoard[4].id}
          score={tileOnBoard[4].score}
          cost={tileOnBoard[4].cost}
          image={tileOnBoard[4].image}
        />
      ) : (
        <DummyTile />
      )}
    </TilesWrap>
  );
}

export default Tiles;
