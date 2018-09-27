import React from "react";
import { Link } from "react-router-dom";

class CoinDeets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 5.0
    };

    this._setValue = this._setValue.bind(this);
  }

  _setValue(val) {
    this.setState({
      value: val
    });
  }
  render() {
    let price;
    let targetPrice;
    if (!this.props.price) {
      price = "Loading...";
      targetPrice = "Loading...";
    } else {
      price = Number(this.props.price.price);
      targetPrice = (price + price * (Number(this.state.value) / 100)).toFixed(
        4
      );
    }
    return (
      <div className="coinCard">
        <div className="coinTrackedDetails">
          <div className="nameAndPrice">
            <div>{this.props.coin.coin}</div>
            <div> </div>
            <div
              className={`price price${
                this.props.price ? this.props.price.direction : "same"
              }`}
            >
              {price}
            </div>
            </div>
          </div>
        </div>
        <div />
        <br />
        <div className="notifContainer">
          <div className="notifSettings">
            <p>Target price: {targetPrice}</p>
            <span className="valuePadding">
              <input
                type="number"
                name="target_price"
                id="target_price"
                value={Number(this.state.value).toFixed(2)}
                onChange={e => this._setValue(e.target.value)}
                step="0.1"
              />
              %
            </span>
          </div>
          <div className="notifSwitches">
            <div className="telegramSwitch">
              <p>Chat Notifications</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={this.props.coin.telegram_track}
                  onChange={e =>
                    this.props.handleTrackChange(
                      "telegram",
                      e.target.checked,
                      this.props.coin.coin,
                      this.props.price.price,
                      this.state.value
                    )
                  }
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoinDeets;
