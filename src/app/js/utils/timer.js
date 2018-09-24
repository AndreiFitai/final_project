import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

function getData(cb) {
  socket.on("priceData", getPriceData => cb(null, getPriceData));
  socket.emit("sendData", 5000);
}

export {
  getData
};