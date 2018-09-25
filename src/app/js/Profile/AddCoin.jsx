import React from "react";
import { Redirect } from "react-router-dom";
import api from "../utils/api";

class AddCoin extends React.Component {
  render() {
    console.log(this.props);
    api
      .post("/api/coin/addcoin", {
        email: this.props.user.email,
        coin: this.props.selectedCoin
      })
      .then(this.props.setTrackedCoins());

    return <Redirect to="/profile" />;
  }
}

export default AddCoin;
