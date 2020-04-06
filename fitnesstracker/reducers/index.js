import { ADD_ENTRY, RECIEVE_ENTRIES } from "../actions";

const entries = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      console.log({ ...state, ...action.entry });
      return { ...state, ...action.entry };

    case RECIEVE_ENTRIES:
      console.log({ ...state, ...action.entries });
      return { ...state, ...action.entries };

    default:
      return state;
  }
};

export default entries;
