import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default class History extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let habits = JSON.parse(window.localStorage.getItem("habits"));
    let habit = habits.filter(
      item => item.id === parseInt(this.props.match.params.id)
    )[0];

    let daysRecorded = habit.days;
    let dayGrids = [];
    for (let i = 0; i < 365; i++) {
      let dayGridDate = moment()
        .subtract(i, "days")
        .format("YYYY-MM-D");
      if (dayGridDate.toString() === daysRecorded[daysRecorded.length - 1]) {
        dayGrids.unshift(<div className="day day--active" key={i} />);
        daysRecorded.splice(daysRecorded.length - 1, 1);
      } else {
        dayGrids.unshift(<div className="day" key={i} />);
      }
    }

    return (
      <div className="history">
        <div className="history__header">
          <div>
            <div className="habit__name habit__name--large">{habit.name}</div>
            <div className="history__duration">Last 365 Days</div>
          </div>
          <span className="history__close">
            <Link to="/" className="button button--danger">
              Back
            </Link>
          </span>
        </div>
        <div className="days">{dayGrids}</div>
      </div>
    );
  }
}
