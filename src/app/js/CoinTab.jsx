import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const CoinTab = props => {
  return (
    <div className="coinContainer">
      <img src={`https://www.cryptocompare.com${props.img}`} alt="" />
      <p>{props.name}</p>
      <br />
      <p>{props.fullName}</p>
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
                  beginAtZero: true
                }
              }
            ]
          }
        }}
        width={200}
        height={100}
      />
    </div>
  );
};

export default CoinTab;
