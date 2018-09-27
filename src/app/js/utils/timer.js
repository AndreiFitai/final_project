import openSocket from "socket.io-client";
const socket = openSocket(`https://${window.location.hostname}:8000`);

function getData(cb) {
  socket.on("priceData", data => {
    cb(null, data);
  });
  socket.emit("sendData", 5000);
}

export { getData };
