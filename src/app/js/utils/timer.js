import openSocket from "socket.io-client";
const socket = openSocket(`https:///coinbuddybot.herokuapp.com:8000`);

function getData(cb) {
  socket.on("priceData", data => {
    cb(null, data);
  });
  socket.emit("sendData", 5000);
}

function checkUserChatId(cb) {
  socket.on("chatId", data => {
    console.log("got data on front end", data);

    cb(null, data);
  });
  socket.emit("checkChatId", 5000);
}

export { getData, checkUserChatId };
