import {
  ADD_ENTRY,
  RECIEVE_ENTRIES,
  RESET_ENTRY,
  REMOVE_ENTRY,
} from "../actions";

const entries = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      console.log({ ...action.entry });
      return { ...state, ...action.entry };

    case RECIEVE_ENTRIES:
      return { ...state, ...action.entries };

    case RESET_ENTRY:
      let newState = { ...state };
      newState[action.date] = null;
      return newState;

    case REMOVE_ENTRY: {
      let newState = { ...state };
      delete newState[action.date];
      console.log("JOO MAN HAT S ANGEFEUERT");
      return newState;
    }

    default:
      return state;
  }
};

export default entries;
