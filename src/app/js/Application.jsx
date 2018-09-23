import React from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Auth from "./Auth";
import Home from "./Home";
import Navigation from "./Navigation";
import Profile from "./Profile";
import NotFound from "./NotFound";
import api from "./utils/api";
import { subscribeToTimer, getData } from "./utils/timer";

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this._setUser(true),
      top10Coins: [],
      timestamp: "no timestamp yet",
      priceData: [],
      coinsHistory: [],
      graphState: []
    };

    subscribeToTimer((err, timestamp) => {
      this.setState({
        timestamp
      });
    });

    getData((err, data) => {
      this.setState({
        priceData: data
      });
    });

    this._setUser = this._setUser.bind(this);
    this._resetUser = this._resetUser.bind(this);
    this._setGraphState = this._setGraphState.bind(this);
  }

  componentDidMount() {
    this._setUser();
    this._setGraphState();
    axios.get(`/api/coin/top10`).then(result => {
      this.setState({ top10Coins: result.data });
    });
    axios.get(`/api/coin/top10prices`).then(result => {
      this.setState({ priceData: result.data });
    });
    axios.get(`/api/coin/history`).then(result => {
      this.setState({ coinsHistory: result.data });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation user={this.state.user} time={this.state.timestamp} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  user={this.state.user}
                  data={this.state.top10Coins}
                  prices={this.state.priceData}
                  coinsHistory={this.state.coinsHistory}
                  graphState={this.state.graphState}
                  setGraphState={this._setGraphState}
                />
              )}
            />
            <Route
              exact
              path="/profile"
              render={() => <Profile user={this.state.user} />}
            />
            <Route
              path="/auth"
              render={() => (
                <Auth setUser={this._setUser} resetUser={this._resetUser} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  _resetUser() {
    this.setState({
      user: null
    });
  }

  _setUser(init) {
    const token = localStorage.getItem("identity");
    if (token) {
      const decoded = jwtDecode(token);
      delete decoded.iat;
      if (init) return decoded;
      this.setState({ user: decoded });
    } else {
      return null;
    }
  }

  _setGraphState(isOpen, timeframe, index) {
    let data = [];
    if (this.state.graphState.length == 0) {
      for (let x = 0; x < 10; x++) {
        let temp = {};
        temp.index = x;
        temp.timeframe = "week";
        temp.isOpen = false;
        data.push(temp);
      }
      this.setState({ graphState: data });
    } else {
      data = this.state.graphState;
      data[index].isOpen = isOpen;
      data[index].timeframe = timeframe;
      this.setState({ graphState: data });
    }
  }
}

export default Application;
