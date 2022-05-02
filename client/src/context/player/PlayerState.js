import React, {useContext, useReducer} from 'react';
import axios from 'axios';
import PlayerContext from './playerContext';
import playerReducer from './playerReducer';
import {CLEAR_CURRENT_PLAYER, CLEAR_PLAYERS, GET_PLAYER, GET_PLAYERS} from '../types';

// Create a custom hook to use the player context
export const usePlayers = () => {
  const {state, dispatch} = useContext(PlayerContext);
  return [state, dispatch];
};

// Get Players
export const getPlayers = async (dispatch, start, end) => {
  try {
    const res = await axios.get(`/api/players?start=${start}&end=${end}`);
    dispatch({
      type: GET_PLAYERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
};

// Get Player
export const getPlayer = async (dispatch, id) => {
  try {
    const res = await axios.get(`/api/players/${id}`);

    dispatch({
      type: GET_PLAYER,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
};

// Clear Players
export const clearPlayers = (dispatch) => {
  dispatch({type: CLEAR_PLAYERS});
};


// Clear Current Player
export const clearCurrentPlayer = (dispatch) => {
  dispatch({type: CLEAR_CURRENT_PLAYER});
};

const PlayerState = (props) => {
  const initialState = {
    players: null,
    player: null
  };

  const [state, dispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={{state: state, dispatch}}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerState;
