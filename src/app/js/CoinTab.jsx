import React from "react";
import millify from "millify";
import CoinDeets from "./CoinDeets";
import { Line } from "react-chartjs-2";
import { presets } from "react-motion";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";

const CoinTab = props => {
  let selectedTimeFrame = {};
  if (props.graphState.timeframe === "day") {
    selectedTimeFrame = {
      labels: props.dayHistory.timestamps,
      data: props.dayHistory.closes
    };
  } else if (props.graphState.timeframe === "week") {
    selectedTimeFrame = {
      labels: props.weekHistory.timestamps,
      data: props.weekHistory.closes
    };
  } else if (props.graphState.timeframe === "month") {
    selectedTimeFrame = {
      labels: props.monthHistory.timestamps,
      data: props.monthHistory.closes
    };
  } else if (props.graphState.timeframe === "year") {
    selectedTimeFrame = {
      labels: props.yearHistory.timestamps,
      data: props.yearHistory.closes
    };
  }

  let mainColor;
  if (
    selectedTimeFrame.data[0] <
    selectedTimeFrame.data[selectedTimeFrame.data.length - 1]
  ) {
    mainColor = "20,10,220";
  } else {
    mainColor = "220,10,75";
  }

  const data = {
    labels: selectedTimeFrame.labels,
    datasets: [
      {
        fill: true,
        lineTension: 0,
        backgroundColor: `rgba(${mainColor},0.4)`,
        borderColor: `rgba(${mainColor},1)`,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 2,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: selectedTimeFrame.data
      }
    ]
  };

  const mainChartStyle = {
    responsive: true,
    animation: {
      duration: 300,
      easing: "easeInCirc"
    },
    title: {
      display: true,
      text: props.graphState.timeframe
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false
          }
        }
      ]
    }
  };

  let sparklineColor;
  if (
    props.dayHistory.closes[0] <
    props.dayHistory.closes[props.dayHistory.closes.length - 1]
  ) {
    sparklineColor = "20,10,220";
  } else {
    sparklineColor = "220,10,75";
  }

  const sparklineData = {
    labels: props.dayHistory.timestamps,
    datasets: [
      {
        fill: true,
        lineTension: 0,
        backgroundColor: `rgba(${sparklineColor},0.4)`,
        borderColor: `rgba(${sparklineColor},1)`,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: `rgba(${sparklineColor},1)`,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 2,
        pointHoverBackgroundColor: `rgba(${sparklineColor},1)`,
        pointHoverBorderColor: `rgba(220,220,220,1)`,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.dayHistory.closes
      }
    ]
  };

  const sparklineStyle = {
    responsive: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            drawTicks: false,
            drawOnChartArea: false
          },
          ticks: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            drawTicks: false,
            drawOnChartArea: false
          },
          ticks: {
            display: false,
            beginAtZero: false
          }
        }
      ]
    }
  };

  return (
    <div className="coinTainer">
      <div className="coinHeader">
        <div className="extraDetails">
          <button
            className="btn btnDetails"
            onClick={e =>
              props.setGraphState(
                !props.graphState.isOpen,
                props.graphState.timeframe,
                props.index
              )
            }
          >
            {" "}
            Details{" "}
          </button>
        </div>
        <div className="iconAndName">
          <div className="icon">
            <img src={`https://www.cryptocompare.com${props.img}`} alt="" />
          </div>
          <div className="shortName">
            <p>{props.name}</p>
          </div>
          <div className="fullName">
            <p>{props.fullName}</p>
          </div>
        </div>
        <div className="priceDiv">
          <p>Price: </p>
          <div className="price">
            <span className={`price${props.direction}`}>{props.price} $</span>
          </div>
        </div>
        <div className="supplyDiv">
          <p>Coin Supply</p>
          <div className="supply">{props.supply}</div>
        </div>
        <div className="volumeDiv">
          <p>Transaction Volume Last 24H</p>
          <div className="supply">
            {millify(props.totalVolume * props.price)} $
          </div>
        </div>
        <div className="sparklineDiv">
          <p>Last 24h</p>
          <Line
            data={sparklineData}
            options={sparklineStyle}
            width={200}
            height={80}
          />
        </div>
        <div className="trackButton">
          <Link
            className="link"
            to={{
              pathname: `/profile/addcoin/${props.name}`,
              state: {
                user: props.user.email
              }
            }}
          >
            <button className="btn btnTrackCoin">Track Coin</button>
          </Link>
        </div>
      </div>
      <Collapse
        isOpened={props.graphState.isOpen}
        springConfig={presets.noWobble}
      >
        <div className="coinDetails">
          <div className="coinDetailStream">
            <CoinDeets />
          </div>
          <div className="mainChart">
            <button
              className="btn"
              onClick={e => {
                props.setGraphState(
                  props.graphState.isOpen,
                  "day",
                  props.index
                );
              }}
            >
              24 hours
            </button>
            <button
              className="btn"
              onClick={e => {
                props.setGraphState(
                  props.graphState.isOpen,
                  "week",
                  props.index
                );
              }}
            >
              7 days
            </button>
            <button
              className="btn"
              onClick={e => {
                props.setGraphState(
                  props.graphState.isOpen,
                  "month",
                  props.index
                );
              }}
            >
              Month
            </button>
            <button
              className="btn"
              onClick={e => {
                props.setGraphState(
                  props.graphState.isOpen,
                  "year",
                  props.index
                );
              }}
            >
              Year
            </button>
            <Line
              data={data}
              options={mainChartStyle}
              width={600}
              height={240}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default CoinTab;
