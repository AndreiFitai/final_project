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
              <td>{Number(props.dash.dayOpen).toFixed(4)} $</td>
            </tr>

            <tr className="grey-row">
              <td>Volume over past day:</td>
              <td>{Number(props.dash.dayVolume).toFixed(4)} </td>
            </tr>

            <tr>
              <td>Volume over the previous day:</td>
              <td>{Number(props.dash.dayOpenVolume).toFixed(4)} </td>
            </tr>

            <tr className="grey-row">
              <td>Price one week ago:</td>
              <td>{Number(props.dash.weekOpen).toFixed(4)} $$</td>
            </tr>

            <tr>
              <td>Volume over the past week:</td>
              <td> {Number(props.dash.weekVolume).toFixed(4)} </td>
            </tr>

            <tr className="grey-row">
              <td>Volume over the previous week:</td>
              <td>{Number(props.dash.weekOpenVolume).toFixed(4)} $</td>
            </tr>

            <tr>
              <td>Price one month ago:</td>
              <td>{Number(props.dash.monthOpen).toFixed(4)} $</td>
            </tr>

            <tr className="grey-row">
              <td>Volume over the past 30 days:</td>
              <td>{Number(props.dash.monthVolume).toFixed(4)}</td>
            </tr>
            <tr>
              <td>Volume over the previous 30 days:</td>
              <td>{Number(props.dash.monthOpenVolume).toFixed(4)}</td>
            </tr>
            <tr className="grey-row">
              <td>Price on year ago:</td>
              <td>{Number(props.dash.yearOpen).toFixed(4)} $</td>
            </tr>
            <tr>
              <td>Volume over the past year:</td>
              <td>{Number(props.dash.yearVolume).toFixed(4)} </td>
            </tr>
            <tr className="grey-row">
              <td>Volume over the previous year:</td>
              <td>{Number(props.dash.yearOpenVolume).toFixed(4)} </td>
            </tr>
            <tr>
              <td>Highest price:</td>
              <td>{Number(props.dash.high).toFixed(4)} $</td>
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
              <td>{Number(props.dash.availableSupply).toFixed(4)} </td>
            </tr>
            <tr>
              <td>Max available supply:</td>
              <td>{Number(props.dash.maxSupply).toFixed(4)} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinDeets;
