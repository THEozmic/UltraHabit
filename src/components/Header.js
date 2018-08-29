import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <Link
        className="button button--fullscreen button--no-radius header"
        to="/add-habit"
      >
        ADD HABIT
      </Link>
    );
  }
}
