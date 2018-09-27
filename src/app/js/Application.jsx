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
import { getData, setUserChatId } from "./utils/timer";

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this._setUser(true),
      trackedCoins: [],
      selectedCoin: null,
      top10Coins: [],
      priceData: [],
      coinsHistory: [],
      coinDashboards: [],
      graphState: []
    };

    getData((err, data) => {
      this.setState({
        priceData: data
      });
    });

    this._setUser = this._setUser.bind(this);
    this._resetUser = this._resetUser.bind(this);
    this._setTrackedCoins = this._setTrackedCoins.bind(this);
    this._setSelectedCoin = this._setSelectedCoin.bind(this);
    this._setGraphState = this._setGraphState.bind(this);
    this._handleTrackChange = this._handleTrackChange.bind(this);
  }

  componentDidMount() {
    this._setUser();
    this._setGraphState();
    this._setTrackedCoins();
    axios.get(`/api/coin/top10`).then(result => {
      this.setState({ top10Coins: result.data });
    });
    axios.get(`/api/coin/top10prices`).then(result => {
      this.setState({ priceData: result.data });
    });
    axios.get(`/api/coin/history`).then(result => {
      this.setState({ coinsHistory: result.data });
    });
    axios.get(`/api/coin/dashboards`).then(result => {
      this.setState({ coinDashboards: result.data });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation user={this.state.user} />
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
                  coinDashboards={this.state.coinDashboards}
                  setGraphState={this._setGraphState}
                  setSelectedCoin={this._setSelectedCoin}
                />
              )}
            />
            <Route
              path="/profile"
              render={() => (
                <Profile
                  user={this.state.user}
                  priceData={this.state.priceData}
                  trackedCoins={this.state.trackedCoins}
                  setTrackedCoins={this._setTrackedCoins}
                  selectedCoin={this.state.selectedCoin}
                  handleTrackChange={this._handleTrackChange}
                />
              )}
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
      user: null,
      trackedCoins: []
    });
  }

  _handleTrackChange(type, val, coin, price_current, target) {
    let tempTracked = this.state.trackedCoins.map(el => {
      if (el.coin === coin) {
        el.price_current = price_current;
        el.target_price = target;
        if (type === "telegram") {
          el.telegram_track = val == true ? true : false;
          api
            .post("/api/coin/addcoin", {
              email: this.state.user.email,
              coin: coin,
              price_current: price_current,
              target_price: target,
              telegram_track: val == true ? true : false,
              slack_track: el.slack_track
            })
            .then();
        } else {
          el.slack_track = val === true ? true : false;
          api
            .post("/api/coin/addcoin", {
              email: this.state.user.email,
              coin: coin,
              price_current: price_current,
              target_price: target,
              telegram_track: el.telegram_track,
              slack_track: val == true ? true : false
            })
            .then();
        }
        return el;
      }
      return el;
    });
    this.setState({
      trackedCoins: tempTracked
    });
  }

  _setUser(init) {
    const token = localStorage.getItem("identity");
    if (token) {
      const decoded = jwtDecode(token);
      delete decoded.iat;
      if (init) return decoded;
      this._setTrackedCoins();
      this.setState({ user: decoded });
    } else {
      return null;
    }
  }

  _setSelectedCoin(coin) {
    this.setState({
      selectedCoin: coin
    });
  }

  _setTrackedCoins(coin) {
    if (coin) {
      let data = this.state.trackedCoins;
      data.push(coin);
      this.setState({ trackedCoins: data });
    } else this.state.user;
    api.get(`/api/coin/trackedCoins/${this.state.user.email}`).then(result => {
      this.setState({ trackedCoins: result });
    });
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
