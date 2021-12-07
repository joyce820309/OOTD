// const getTimeZoneReducer = (state = "", action) => {
//   switch (action.type) {
//     case "TIMEZONE":
//       return (state = action.payload);
//     default:
//       return state;
//   }
// };

// export default getTimeZoneReducer;

const getIsUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER":
      return action.payload;
    default:
      return state;
  }
};

export default getIsUserReducer;
