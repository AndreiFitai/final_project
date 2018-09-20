import React from "react";
import CoinTab from "./CoinTab";

const Home = props => {
  let coinTabs;
  if (props.data != null) {
    coinTabs = props.data.map((el, index) => {
      let coin = {};
      coin.fullName = el.CoinInfo.FullName;
      coin.name = el.CoinInfo.Name;
      coin.img = el.CoinInfo.ImageUrl;
      coin.supply = el.ConversionInfo.Supply;
      coin.totalVolume = el.ConversionInfo.TotalVolume24H;
      return (
        <CoinTab
          name={coin.name}
          img={coin.img}
          fullName={coin.fullName}
          supply={coin.supply}
          totalVolume={coin.totalVolume}
          key={index}
        />
      );
    });
  }

  return (
    <div className="container">
      <h1>Hello, {props.user ? props.user.email : "Stranger"}!</h1>
      {props.data ? coinTabs : <div />}
    </div>
  );
};

export default Home;
