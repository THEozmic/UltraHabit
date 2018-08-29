import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import configureStore from "./store";
import "./index.css";
import Home from "./components/Home";
import registerServiceWorker from "./registerServiceWorker";
import AddHabitForm from "./components/AddHabitForm";
import Header from "./components/Header";
import History from "./components/History";

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <div>
        <Header />
        <div className="root">
          <Route exact path="/" component={Home} />
          <Route exact path="/add-habit" component={AddHabitForm} />
          <Route exact path="/view-history/:id" component={History} />
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
