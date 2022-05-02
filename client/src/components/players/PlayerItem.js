import React from 'react';
import {useNavigate} from "react-router-dom";
import {getPlayer, usePlayers} from "../../context/player/PlayerState";

const PlayerItem = ({player}) => {
  const {personId, firstName, lastName, jersey, teamSitesOnly} = player;
  const [playerState, playerDispatch] = usePlayers();
  const navigate = useNavigate();

  const handleClick = () => {
    getPlayer(playerDispatch, personId);
    navigate("/player");
  };

  return (
    <tr className='cursor-pointer' onClick={handleClick}>
      <td>{firstName}</td>
      <td>
        {lastName}
      </td>
      <td>
        {jersey}
      </td>
      <td>
        {teamSitesOnly ? teamSitesOnly.posFull : "Nepoznato"}
      </td>
    </tr>
  );
};

export default PlayerItem;
