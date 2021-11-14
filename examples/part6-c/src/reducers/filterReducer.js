import React from "react";

const filterReducer = (state = "ALL", action) => {
  console.log("filter", state);
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

// action creator
export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    filter,
  };
};

export default filterReducer;
