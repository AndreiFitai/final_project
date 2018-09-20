import React from "react";
import CoinTab from "./CoinTab";

const Home = props => {
  const coinTabs = props.data.map((el, index) => {
    const price = props.prices.filter(price => {
      return el.name == price.currency;
    });
    return (
      <CoinTab
        name={el.name}
        img={el.img}
        fullName={el.fullName}
        price={price[0] ? price[0].price : 0}
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
