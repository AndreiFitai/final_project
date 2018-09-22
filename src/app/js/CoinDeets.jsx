import React from "react";

const CoinDeets = props => {
  return (
    <div className="col-md-5 price-boxes">
      <div className="panel-group">
        <div className="panel panel-default">
          <div className="panel-body">
            <h6>
              <a href="https://www.cryptocompare.com">
                Source: CryptoCompare.com
              </a>
            </h6>
            <h2 className="price-display">
              ETH - USD <span className="price" id="PRICE_ETH" />
            </h2>
            <h5>
              24h Change: <span id="CHANGE24HOUR_ETH" />
              <span className="pct-change" id="CHANGE24HOURPCT_ETH" />
              <br />
            </h5>
            <h5>
              Last Market: <span className="exchange" id="LASTMARKET_ETH" />{" "}
              <br />
            </h5>
            <h5>
              Trade ID: <span id="LASTTRADEID_ETH" />
              <br />
            </h5>
            <h5>
              Open Hour: <span id="OPENHOUR_ETH" />
              <br />
            </h5>
            <h5>
              High Hour: <span id="HIGHHOUR_ETH" />
              <br />
            </h5>
            <h5>
              Low Hour: <span id="LOWHOUR_ETH" />
              <br />
            </h5>
            <h5>
              Open Day: <span id="OPEN24HOUR_ETH" />
              <br />
            </h5>
            <h5>
              High Day: <span id="HIGH24HOUR_ETH" />
              <br />
            </h5>
            <h5>
              Low Day: <span id="LOW24HOUR_ETH" />
              <br />
            </h5>
            <h5>
              Last Trade Volume: <span id="LASTVOLUME_ETH" />
              <br />
            </h5>
            <h5>
              Last Trade Volume To: <span id="LASTVOLUMETO_ETH" />
              <br />
            </h5>
            <h5>
              24h Volume: <span id="VOLUME24HOUR_ETH" />
              <br />
            </h5>
            <h5>
              24h VolumeTo: <span id="VOLUME24HOURTO_ETH" />
              <br />
            </h5>
            <h5>
              Total Volume (ETH): <span id="FULLVOLUMEFROM_ETH" />
              <br />
            </h5>
            <h5>
              Total Volume (USD): <span id="FULLVOLUMETO_ETH" />
              <br />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDeets;
