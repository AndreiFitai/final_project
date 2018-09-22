import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const CoinTab = props => {
  const data = {
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

  return (
    <div className="coinTainer">
      <img src={`https://www.cryptocompare.com${props.img}`} alt="" />
      <p>{props.name}</p>
      <br />
      <p>{props.fullName}</p>
      <br />
      <p>price: {props.price} $</p>
      <br />
      <p>{props.supply}</p>
      <br />
      <p>{props.totalVolume}</p>
      <br />
      <Line
        data={data}
        options={{
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
        }}
        width={200}
        height={80}
      />
    </div>
  );
};

export default CoinTab;
