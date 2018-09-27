import React from "react";
import CoinTab from "./CoinTab";
import axios from "axios";

const Home = props => {
  const coinTabs = props.data.map((el, index) => {
    const price = props.prices.filter(price => {
      return el.currency == price.currency;
    });
    const history = props.coinsHistory.filter(hist => {
      return el.currency == hist.currency;
    });
    const dashboard = props.coinDashboards.filter(dash => {
      return el.currency == dash.currency;
    });
    return (
      <CoinTab
        user={props.user}
        name={el.currency}
        img={el.data.imgUrl}
        fullName={el.data.fullname}
        price={price[0] ? price[0].price : "Loading..."}
        direction={price[0] ? price[0].direction : "same"}
        dayHistory={
          history[0] ? history[0].day : { timestamps: [], closes: [] }
        }
        weekHistory={
          history[0] ? history[0].week : { timestamps: [], closes: [] }
        }
        monthHistory={
          history[0] ? history[0].month : { timestamps: [], closes: [] }
        }
        yearHistory={
          history[0] ? history[0].year : { timestamps: [], closes: [] }
        }
        supply={el.data.supply}
        totalVolume={el.data.totalVol}
        graphState={props.graphState[index]}
        coinDashboard={dashboard[0]}
        setGraphState={props.setGraphState}
        setSelectedCoin={props.setSelectedCoin}
        index={index}
        key={index}
      />
    );
  });

  return <div className="container">{props.data ? coinTabs : <div />}</div>;
};

export default Home;
