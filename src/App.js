import React, { Component } from "react";
import { connect } from "react-redux";
import { demo } from "./actions/demo";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  demo = () => {
    this.props.demo();
  };

  render = () => {
    return <button onClick={this.demo}>Click Me</button>;
  };
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  demo: stuff => dispatch(demo(stuff))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
