import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProfileView from "./ProfileView";
import AddCoin from "./AddCoin";
import NotFound from "../NotFound";

class Profile extends Component {
  render() {
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection
    return (
      <Switch>
        <Route
          exact
          path="/profile"
          render={() => (
            <ProfileView
              user={this.props.user}
              priceData={this.props.priceData}
              trackedCoins={this.props.trackedCoins}
              setTrackedCoins={this.props.setTrackedCoins}
            />
          )}
        />
        <Route
          exact
          path="/profile/addcoin"
          render={() => (
            <AddCoin
              user={this.props.user}
              selectedCoin={this.props.selectedCoin}
              setTrackedCoins={this.props.setTrackedCoins}
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Profile;
