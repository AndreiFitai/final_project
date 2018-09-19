import React from "react";
import Graph from "./Graph";

const Home = props => {
  return (
    <div className="container">
      <h1>Hello, {props.user ? props.user.email : "Stranger"}!</h1>
      <Graph />
    </div>
  );
};

export default Home;
