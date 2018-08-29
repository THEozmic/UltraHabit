import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { saveHabit } from "../actions/habit";

class AddHabitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      startDate: ""
    };
  }

  goBack = () => {
    this.props.history.goBack();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSaveHabit = () => {
    this.props.saveHabit({
      name: this.state.name,
      startDate: moment().format("YYYY-MM-D"),
      days: [moment().format("YYYY-MM-D")]
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <form className="form">
        <div>
          <label>
            Habit Name
            <input
              type="text"
              className="input"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="form-buttons">
          <Link
            className="button button--danger"
            onClick={this.goBack}
            to={window.location.hash}
          >
            Close
          </Link>
          <button
            className="button button--primary"
            type="button"
            onClick={this.handleSaveHabit}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  saveHabit: data => dispatch(saveHabit(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddHabitForm);
