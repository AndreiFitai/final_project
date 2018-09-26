import React from "react";

const CoinDeets = props => {
  return (
    <div className="coinCard">
      <div className="coinTrackedDetails">
        <div>{props.coin.coin}</div>
        <div> </div>
        <div className={`price price${props.price.direction}`}>
          {props.price.price}
        </div>
      </div>
      <div />
      <br />
      <div className="notifContainer">
        <div className="notifSettings">
          <p>Target price</p>
        </div>
        <div className="notifSwitches">
          <div className="telegramSwitch">
            <p>Telegram</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={props.coin.telegram_track}
                onChange={e =>
                  props.handleTrackChange(
                    "telegram",
                    e.target.checked,
                    props.coin.coin,
                    props.price.price,
                    "5"
                  )
                }
              />
              <span className="slider round" />
            </label>
          </div>
          <div className="slackSwitch">
            <p>Slack</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={props.coin.slack_track}
                onChange={e =>
                  props.handleTrackChange(
                    "slack",
                    e.target.checked,
                    props.coin.coin,
                    props.price.price,
                    "5"
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
};

export default CoinDeets;
