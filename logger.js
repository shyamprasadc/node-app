// const EventEmiter = require("events");

// let url = "http://mylogger.io/log";

// class Logger extends EventEmiter {
//   log(message) {
//     console.log(message);
//     this.emit("messageLogged", { id: 1, url: url });
//   }
// }

// module.exports = Logger;

const logger = (req,res,next) => {
  console.log("Logging..");
  next();
  };

module.exports = logger;