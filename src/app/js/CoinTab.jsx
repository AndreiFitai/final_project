import React from "react";
import { Line } from "react-chartjs-2";
import { presets } from "react-motion";
import { Collapse } from "react-collapse";

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

  const data = {
    labels: selectedTimeFrame.labels,
    datasets: [
      {
        fill: true,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
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

  const sparklineData = {
    labels: props.dayHistory.timestamps,
    datasets: [
      {
        fill: true,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
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
      <div
        className="coinHeader"
        onClick={e =>
          props.setGraphState(
            !props.graphState.isOpen,
            props.graphState.timeframe,
            props.index
          )
        }
      >
        <img src={`https://www.cryptocompare.com${props.img}`} alt="" />
        <p>{props.name}</p>
        <br />
        <p>{props.fullName}</p>
        <br />
        <p>
          price: <span />
          {props.price} $
        </p>
        <br />
        <p>{props.supply}</p>
        <br />
        <p>{props.totalVolume}</p>
        <br />
        <Line
          data={sparklineData}
          options={sparklineStyle}
          width={200}
          height={80}
        />
      </div>
      <div className="coinDetails">
        <Collapse
          isOpened={props.graphState.isOpen}
          springConfig={presets.noWobble}
        >
          <button
            onClick={e => {
              props.setGraphState(props.graphState.isOpen, "day", props.index);
            }}
          >
            24 hours
          </button>
          <button
            onClick={e => {
              props.setGraphState(props.graphState.isOpen, "week", props.index);
            }}
          >
            7 days
          </button>
          <button
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
            onClick={e => {
              props.setGraphState(props.graphState.isOpen, "year", props.index);
            }}
          >
            Year
          </button>
          <Line data={data} width={600} height={240} />
        </Collapse>
      </div>
    </div>
  );
};

export default CoinTab;
