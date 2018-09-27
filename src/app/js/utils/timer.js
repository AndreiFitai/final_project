import openSocket from "socket.io-client";
const socket = openSocket(`http://${window.location.hostname}:8000`);

function getData(cb) {
  socket.on("priceData", data => {
    cb(null, data);
  });
  socket.emit("sendData", 5000);
}

function checkUserChatId(cb) {
  socket.on("chatId", data => {
    console.log(data);
    cb(null, data);
  });
  socket.emit("checkChatId", 5000);
}

export { getData, checkUserChatId };
