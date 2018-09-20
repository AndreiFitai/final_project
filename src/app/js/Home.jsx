import React from "react";
import CoinTab from "./CoinTab";
import axios from "axios";

const Home = props => {
  const coinTabs = props.data.map((el, index) => {
    const price = props.prices.filter(price => {
      return el.name == price.currency;
    });
    const history = props.coinsHistory.filter(hist => {
      return el.name == hist.currency;
    });
    return (
      <CoinTab
        name={el.name}
        img={el.img}
        fullName={el.fullName}
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
          history[0] ? history[0].yearh : { timestamps: [], closes: [] }
        }
        supply={el.supply}
        totalVolume={el.totalVolume}
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
