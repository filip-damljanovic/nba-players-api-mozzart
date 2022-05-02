import React, {Fragment, useEffect, useState} from 'react';
import PlayerItem from './PlayerItem';
import {getPlayers, usePlayers} from '../../context/player/PlayerState';
import Spinner from "../layout/Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';

const Players = () => {
  const sizePerRequest = 20;

  const [playerState, playerDispatch] = usePlayers();
  const {players} = playerState;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(sizePerRequest);

  useEffect(() => {
    getPlayers(playerDispatch, start, end);
    setStart(start + sizePerRequest);
    setEnd(end + sizePerRequest);
  }, [playerDispatch]);

  const callGetPlayers = () => {
    setStart(start + sizePerRequest);
    setEnd(end + sizePerRequest);
    getPlayers(playerDispatch, start, end);
  };

  return (
    <Fragment>
      {players !== null && players.length > 0 ?
        <Fragment>
          <h2 className="title has-text-centered">
            NBA igraci
          </h2>
          <div>
            <InfiniteScroll
              dataLength={players.length}
              next={callGetPlayers}
              hasMore={start < 700}
              loader={<Spinner/>}
            >
              <table className="player-table">
                <thead>
                <tr>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>#Dres</th>
                  <th>Pozicija</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player) => (
                  <PlayerItem key={player.personId} player={player}/>
                ))}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        </Fragment>
        :
        <Spinner/>
      }
    </Fragment>
  )
};

export default Players;