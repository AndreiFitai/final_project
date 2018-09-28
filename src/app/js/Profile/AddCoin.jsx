import React from "react";
import { Redirect } from "react-router-dom";
import api from "../utils/api";

class AddCoin extends React.Component {
  render() {
    console.log(this.props.selectedCoin.img);

    let trackedCoin = {
      email: this.props.user.email,
      coin: this.props.selectedCoin.name,
      price_current: "",
      target_price: "",
      telegram_track: false,
      imgUrl: this.props.selectedCoin.img
    };
    api.post("/api/coin/addcoin", trackedCoin).then(result => {
      this.props.setTrackedCoins(trackedCoin);
    });

    return <Redirect to="/profile" />;
  }
}

export default AddCoin;
