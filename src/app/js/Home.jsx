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
    return (
      <CoinTab
        name={el.currency}
        img={el.data.imgUrl}
        fullName={el.data.fullname}
        price={price[0] ? price[0].price : "Loading..."}
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
        setGraphState={props.setGraphState}
        index={index}
        key={index}
      />
    );
  });

  return (
    <div className="container">
      <h1>Hello, {props.user ? props.user.email : "Stranger"}!</h1>
      {props.data ? coinTabs : <div />}
    </div>
  );
};

export default Home;
