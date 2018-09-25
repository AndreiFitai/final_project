import React from "react";
import moment from "moment";

const CoinDeets = props => {
  if (!props.dash) {
    return <div>Loading...</div>;
  }
  let highest = moment(props.dash.highTimestamp).format("MMMM Do YYYY");
  return (
    <div className="coinDeets">
      <div className="coinDeetsTitle">
        <h4> {props.dash.currency} overview </h4>
      </div>
      <div className="coinDeetsTable">
        <table>
          <tbody>
            <tr>
              <td>Price Yesterday:</td>
              <td>{props.dash.dayOpen} $</td>
            </tr>

            <tr className="grey-row">
              <td>Volume over past day:</td>
              <td>{props.dash.dayVolume} </td>
            </tr>

            <tr>
              <td>Volume over the previous day:</td>
              <td>{props.dash.dayOpenVolume} </td>
            </tr>

            <tr className="grey-row">
              <td>Price one week ago:</td>
              <td>{props.dash.weekOpen} $$</td>
            </tr>

            <tr>
              <td>Volume over the past week:</td>
              <td> {props.dash.weekVolume} </td>
            </tr>

            <tr className="grey-row">
              <td>Volume over the previous week:</td>
              <td>{props.dash.weekOpenVolume} $</td>
            </tr>

            <tr>
              <td>Price one month ago:</td>
              <td>{props.dash.monthOpen} $</td>
            </tr>

            <tr className="grey-row">
              <td>Volume over the past 30 days:</td>
              <td>{props.dash.monthVolume}</td>
            </tr>
            <tr>
              <td>Volume over the previous 30 days:</td>
              <td>{props.dash.monthOpenVolume}</td>
            </tr>
            <tr className="grey-row">
              <td>Price on year ago:</td>
              <td>{props.dash.yearOpen} $</td>
            </tr>
            <tr>
              <td>Volume over the past year:</td>
              <td>{props.dash.yearVolume} </td>
            </tr>
            <tr className="grey-row">
              <td>Volume over the previous year:</td>
              <td>{props.dash.yearOpenVolume} </td>
            </tr>
            <tr>
              <td>Highest price:</td>
              <td>{props.dash.high} $</td>
            </tr>
            <tr className="grey-row">
              <td>Date of highest price:</td>
              <td>{highest} </td>
            </tr>
            <tr>
              <td>Exchange which had highest price:</td>
              <td>{props.dash.highExchange} </td>
            </tr>
            <tr className="grey-row">
              <td>Circulating supply:</td>
              <td>{props.dash.availableSupply} </td>
            </tr>
            <tr>
              <td>Max available supply:</td>
              <td>{props.dash.maxSupply} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinDeets;
