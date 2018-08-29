export const saveHabit = data => dispatch =>
  dispatch({
    type: "SAVE_HABIT_ACTION",
    payload: data
  });

export const updateHabit = data => dispatch =>
  dispatch({
    type: "UPDATE_HABIT_ACTION",
    payload: data
  });
