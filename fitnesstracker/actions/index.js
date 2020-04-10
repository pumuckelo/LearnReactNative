export const RECIEVE_ENTRIES = "RECIEVE_ENTRIES";
export const ADD_ENTRY = "ADD_ENTRY";
export const RESET_ENTRY = "RESET_ENTRY";
export const REMOVE_ENTRY = "REMOVE_ENTRY";

//ACTION CREATORS
export const recieveEntries = (entries) => ({
  type: RECIEVE_ENTRIES,
  entries,
});

export const addEntry = (entry) => ({
  type: ADD_ENTRY,
  entry,
});

export const resetEntry = (date) => ({
  type: RESET_ENTRY,
  date,
});

export const removeEntry = (date) => ({
  type: REMOVE_ENTRY,
  date,
});
