import {CLEAR_CURRENT_PLAYER, CLEAR_PLAYERS, GET_PLAYER, GET_PLAYERS} from '../types';

const playerReducer = (state, action) => {

  switch (action.type) {
    case GET_PLAYERS:
      return {
        ...state,
        players: [...state.players ? state.players : [], ...action.payload]
      };
    case GET_PLAYER:
      return {
        ...state,
        player: action.payload
      };
    case CLEAR_PLAYERS:
      return {
        ...state,
        players: null
      };
    case CLEAR_CURRENT_PLAYER:
      return {
        ...state,
        player: null
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default playerReducer;
