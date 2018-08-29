export default (state = {}, action) => {
  switch (action.type) {
    case "SAVE_HABIT_ACTION":
      let oldHabits = JSON.parse(window.localStorage.getItem("habits")) || [];
      let habits = [
        ...oldHabits,
        {
          id: Math.round(Math.random() * 100000000000),
          ...action.payload
        }
      ];
      window.localStorage.setItem("habits", JSON.stringify(habits));
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
