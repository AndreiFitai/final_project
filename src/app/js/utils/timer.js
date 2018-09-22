import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

function subscribeToTimer(cb) {
  socket.on("timer", timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
}

function getData(cb) {
  socket.on("priceData", getPriceData => cb(null, getPriceData));
  socket.emit("sendData", 10000);
}

export {
  subscribeToTimer,
  getData
};