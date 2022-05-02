import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {clearCurrentPlayer, clearPlayers, usePlayers} from "../../context/player/PlayerState";
import Spinner from "../layout/Spinner";
import playerImage from '../layout/thumbnail.png';

const Player = () => {
  const [playerState, playerDispatch] = usePlayers();
  const {player, players} = playerState;

  const getPlayerName = () => {
    let foundPlayer = players.find(obj => obj.personId === player.personId);
    if (foundPlayer) {
      return foundPlayer.firstName + " " + foundPlayer.lastName;
    }
  };

  const getGameDates = () => {
    let gameDates = [];

    if (player && player.games && player.games.length > 0) {
      player.games.map(game => (
        gameDates.push(<th className="game-date">{game.gameDateUTC}</th>)
      ));
    }

    return gameDates;
  };

  const getGamesStat = (stat) => {
    let gamesStatArray = [];

    if (player && player.games && player.games.length > 0) {
      player.games.map(game => (
        gamesStatArray.push(<td className="bold text-center">{game.stats ? game.stats[stat] : ""}</td>)
      ));
    }

    return gamesStatArray;
  };

  useEffect(() => () => {
    clearCurrentPlayer(playerDispatch);
    clearPlayers(playerDispatch);
  }, []);

  return (
    <div>
      <div className="bg-light text-center cursor-pointer p-20">
        <Link to={"/"}>
          Home
        </Link>
      </div>

      {player !== null && player.games ?
        <div className="player-container flex-justify-center">
          <div className="player-meta-data">
            <img className="player-image round-img" src={playerImage}/>
            <h2>{getPlayerName()}</h2>
          </div>
          <table className="player-stats-table">
            <thead>
            <tr>
              <th style={{"background": "none"}}></th>
              {getGameDates()}
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Poena</td>
              {getGamesStat("points")}
            </tr>
            <tr>
              <td>Asist</td>
              {getGamesStat("assists")}
            </tr>
            <tr>
              <td>Uk Skok</td>
              {getGamesStat("totReb")}
            </tr>
            <tr>
              <td>Def Skok</td>
              {getGamesStat("defReb")}
            </tr>
            <tr>
              <td>Ofa Skok</td>
              {getGamesStat("offReb")}
            </tr>
            </tbody>
          </table>
        </div>
        : <Spinner/>}
    </div>
  );
};

export default Player;
