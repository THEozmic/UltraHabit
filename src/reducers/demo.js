export default (state = {}, action) => {
  switch (action.type) {
    case "DEMO_ACTION":
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
