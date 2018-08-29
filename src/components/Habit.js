import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { updateHabit } from "../actions/habit";

class Habit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      dayStreak: 0
    };
  }

  updateDayStreak = () => {
    let dayStreak = 0;
    const reverseSavedDays = this.props.habit.days.reverse();

    let lastDate = moment(reverseSavedDays[0], "YYYY-MM-D");
    const today = moment().format("YYYY-MM-D");
    const dayDiff = moment.duration(moment(today).diff(lastDate)).asDays();

    for (let i = 0; i <= reverseSavedDays.length; i++) {
      lastDate = moment(reverseSavedDays[i], "YYYY-MM-D");
      if (dayDiff <= 1) {
        if (dayStreak === 0) {
          dayStreak += 1;
        }
      } else {
        break;
      }
      if (reverseSavedDays[i + 1]) {
        let nextDate = moment(reverseSavedDays[i + 1], "YYYY-MM-D");
        if (moment.duration(lastDate.diff(nextDate)).asDays() === 1) {
          dayStreak++;
        } else {
          break;
        }
      }
    }
    this.setState({
      dayStreak
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.habit.days.length !== this.props.habit.days.length) {
      this.updateDayStreak();
    }
  }

  componentDidMount() {
    const today = moment().format("YYYY-MM-D");
    let savedDays = this.props.habit.days;
    if (today === savedDays[savedDays.length - 1]) {
      this.setState({
        isChecked: true
      });
    }

    this.updateDayStreak();
  }

  handleCheckboxChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });

    let habits = JSON.parse(window.localStorage.getItem("habits"));
    let habit = habits.filter(
      item => item.id === parseInt(this.props.habit.id)
    )[0];
    console.log(habit, "yoyoyo");
    let savedDays = habit.days;

    let today = moment().format("YYYY-MM-D");
    if (today !== savedDays[savedDays.length - 1]) {
      savedDays.push(today);
    } else {
      savedDays.splice(savedDays.length - 1, 1);
    }

    habit.days = savedDays;
    this.props.updateHabits(habits);
  };

  render() {
    return (
      <div className="habit">
        <div className="habit__name">{this.props.habit.name}</div>
        <div className="habit__details">
          You're currently on a{" "}
          <b>
            {this.state.dayStreak}
            -DAY-STREAK
          </b>
        </div>
        <div className="habit__footer">
          <div className="habit__status">
            <label>
              <svg
                className="check__icon"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="1.414"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="title"
                viewBox="0 0 32 32"
                preserveAspectRatio="xMidYMid meet"
              >
                <title id="title">checkbox</title>
                {this.state.isChecked ? (
                  <g>
                    <path d="M16,8c2.476,0 4.074,0.209 5.138,0.572c0.414,0.141 0.886,0.076 1.195,-0.234l0.509,-0.508c0.222,-0.222 0.186,-0.593 -0.092,-0.739c-1.527,-0.801 -3.704,-1.091 -6.75,-1.091c-8,0 -10,2 -10,10c0,8 2,10 10,10c8,0 10,-2 10,-10c0,-0.346 -0.004,-0.68 -0.012,-1.004c-0.01,-0.431 -0.526,-0.629 -0.831,-0.324l-0.863,0.862c-0.188,0.189 -0.294,0.444 -0.291,0.711c0.02,2.029 0.074,4.85 -1.417,6.341c-0.864,0.864 -2.572,1.414 -6.586,1.414c-4.014,0 -5.722,-0.55 -6.586,-1.414c-0.864,-0.864 -1.414,-2.572 -1.414,-6.586c0,-4.014 0.55,-5.722 1.414,-6.586c0.864,-0.864 2.572,-1.414 6.586,-1.414Z" />
                    <path d="M10.707,14.293c-0.39,0.39 -0.39,1.024 0,1.414l4.586,4.586c0.39,0.39 1.024,0.39 1.414,0l11.586,-11.586c0.39,-0.39 0.39,-1.024 0,-1.414l-0.336,-0.336c-0.39,-0.39 -1.024,-0.39 -1.414,0l-10.543,10.543l-3.543,-3.543c-0.39,-0.39 -1.024,-0.39 -1.414,0l-0.336,0.336Z" />
                  </g>
                ) : (
                  <g>
                    <path d="M22.586,22.586c0.864,-0.864 1.414,-2.572 1.414,-6.586c0,-4.014 -0.55,-5.722 -1.414,-6.586c-0.864,-0.864 -2.572,-1.414 -6.586,-1.414c-4.014,0 -5.722,0.55 -6.586,1.414c-0.864,0.864 -1.414,2.572 -1.414,6.586c0,4.014 0.55,5.722 1.414,6.586c0.864,0.864 2.572,1.414 6.586,1.414c4.014,0 5.722,-0.55 6.586,-1.414Zm-6.586,3.414c8,0 10,-2 10,-10c0,-8 -2,-10 -10,-10c-8,0 -10,2 -10,10c0,8 2,10 10,10Z" />
                  </g>
                )}
              </svg>
              <input
                type="checkbox"
                className="check__element"
                onChange={this.handleCheckboxChange}
              />
              <span className="check__text">Done Today</span>
            </label>
          </div>
          <Link
            className="button button--secondary button--no-radius"
            to={`/view-history/${this.props.habit.id}`}
          >
            View History
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateHabit: data => dispatch(updateHabit(data))
});

export default connect(
  null,
  mapDispatchToProps
)(Habit);
