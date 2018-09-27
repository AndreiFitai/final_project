import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import CoinCard from "./CoinCard";
import api from "../utils/api";
import base64url from "base64url";

class ProfileView extends Component {
  constructor(props) {
    super(props);

    this._removeCoin = this._removeCoin.bind(this);
  }

  _removeCoin(id) {
    console.log("id called in profile view", id);
    api.post("/api/coin/removecoin", { id }).then(this.props.setTrackedCoins());
  }

  render() {
    let coinCards = this.props.trackedCoins.map((el, index) => {
      let coinPrice = this.props.priceData.filter(price => {
        return price.currency == el.coin;
      });
      return (
        <CoinCard
          coin={el}
          key={index}
          price={coinPrice[0]}
          handleTrackChange={this.props.handleTrackChange}
          removeCoin={this._removeCoin}
        />
      );
    });
    let telegramPrompt;
    if (!this.props.user.chatId) {
      telegramPrompt = (
        <div className="telegramConnect">
          <a
            href={`https://t.me/coinbuddybot?start=${base64url.encode(
              this.props.user.email
            )}`}
            target="_blank"
          >
            <div> Connect to CoinBuddyBot on Telegram to recieve updates !</div>
          </a>
          <br />
          <img src={this.props.user.qrCode} alt="qrcode" />
        </div>
      );
    } else {
      telegramPrompt = (
        <div className="telegramConnect">Connected to CoinBuddyBot !</div>
      );
    }
    return (
      <div>
        <div className="userHeader">
          <div className="userPic">
            <img src={this.props.user.profilePicture} alt="" />
          </div>
          <br />
          <div>Welcome back {this.props.user.email} ! </div>
          <br />
          {telegramPrompt}
        </div>
        <div className="cardContainer">{coinCards}</div>
      </div>
    );
  }
}

export default ProfileView;
