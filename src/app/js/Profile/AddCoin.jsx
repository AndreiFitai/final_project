import React from "react";
import { Redirect } from "react-router-dom";
import api from "../utils/api";

class AddCoin extends React.Component {
  render() {
    api
      .post("/api/coin/addcoin", {
        email: this.props.location.state.user,
        coin: this.props.match.params.coin
      })
      .then();

    return <Redirect to="/profile" />;
  }
}

export default AddCoin;
