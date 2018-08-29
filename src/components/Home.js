import React, { Component } from "react";
import Habit from "./Habit";

import "../styles/App.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormOpen: false,
      isHistoryShown: false,
      habits: []
    };
  }

  componentDidMount() {
    this.setState({
      habits: JSON.parse(localStorage.getItem("habits"))
    });
  }

  updateHabits = habits => {
    window.localStorage.setItem("habits", JSON.stringify(habits));
    this.setState({
      habits
    });
  };

  render() {
    let habits = this.state.habits;
    return (
      <div className="habits">
        {this.state.habits.map(habit => {
          return (
            <Habit
              key={habit.id}
              habit={habit}
              updateHabits={this.updateHabits}
            />
          );
        })}
      </div>
    );
  }
}
