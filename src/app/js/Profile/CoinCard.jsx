import React from "react";

const CoinDeets = props => {
  return (
    <div className="coinCard">
      <div className="coinTrackedDetails">
        <div>{props.name}</div>
        <div> . </div>
        <div className={`price price${props.price.direction}`}>
          {props.price.price}
        </div>
      </div>
      <div />
      <br />
      <div className="notifContainer">
        <div className="notifSettings">Target price or %</div>
        <div className="notifSwitches">
          <div className="telegramSwitch">
            <p>Telegram</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
          </div>
          <div className="slackSwitch">
            <p>Slack</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDeets;
