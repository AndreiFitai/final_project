import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import CoinCard from "./CoinCard";
import api from "../utils/api";
import base64url from "base64url";
import checkmark from "../../assets/check-mark-2-128.png";

class ProfileView extends Component {
  constructor(props) {
    super(props);

    this._removeCoin = this._removeCoin.bind(this);
  }

  _removeCoin(id) {
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
            <div className="connectLink">
              Click here to connect to CoinBuddyBot!
            </div>
          </a>
          <div className="or">Or scan the QR Code</div>
          <img
            className="qrCodeImg"
            src={this.props.user.qrCode}
            alt="qrcode"
          />
        </div>
      );
    } else {
      telegramPrompt = (
        <div className="telegramConnect">
          <div className="connectConfirm">Connected to CoinBuddyBot !</div>
          <div className="checkmark">
            <img src={checkmark} />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="userHeader">
          <div className="user">
            <img src={this.props.user.profilePicture} alt="" />
            <div>Welcome back {this.props.user.email} ! </div>
          </div>
          {telegramPrompt}
        </div>
        <div className="cardContainer">{coinCards}</div>
      </div>
    );
  }
}

export default ProfileView;
