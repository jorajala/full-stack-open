export const filterChange = (filter) => {
  return {
    type: "CHANGE",
    payload: filter,
  };
};

const initialState = "";

const filterReducer = (state = initialState, action) => {
  console.log("filterReducer state: ", state);
  console.log("filterReducer action", action);

  switch (action.type) {
    case "CHANGE":
      return action.payload;

    default:
      return state;
  }
};

export default filterReducer;
