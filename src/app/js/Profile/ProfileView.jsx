import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class ProfileView extends Component {
  componentDidMount() {
    this.props.setTrackedCoins;
  }
  render() {
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
        <div className="cardContainer">
          {" "}
          CARDSSS
          {this.props.trackedCoins}
        </div>
      </div>
    );
  }
}

export default ProfileView;
