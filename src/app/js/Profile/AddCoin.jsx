import React from "react";
import { Redirect } from "react-router-dom";
import api from "../utils/api";

class AddCoin extends React.Component {
  render() {
    let trackedCoin = {
      email: this.props.user.email,
      coin: this.props.selectedCoin,
      price_current: "",
      target_price: "",
      telegram_track: false,
      slack_track: false
    };
    api
      .post("/api/coin/addcoin", trackedCoin)
      .then(this.props.setTrackedCoins(trackedCoin));

    return <Redirect to="/profile" />;
  }
}

export default AddCoin;
