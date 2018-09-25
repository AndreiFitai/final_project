import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import CoinCard from "./CoinCard";
import api from "../utils/api";

class ProfileView extends Component {
  render() {
    let coinCards = this.props.trackedCoins.map((el, index) => {
      return <CoinCard name={el} />;
    });

    return (
      <div>
        <div className="userHeader">
          <div className="userPic">
            <img src={this.props.user.profilePicture} alt="" />
          </div>

          <br />
          {this.props.user._id}
          <br />
          {this.props.user.email}
        </div>
        <div className="cardContainer">{coinCards}</div>
      </div>
    );
  }
}

export default ProfileView;
