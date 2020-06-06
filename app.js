// const path = require("path");
// const os = require("os");
// const fs = require("fs");

// let pathObj = path.parse (__filename)
// console.log(pathObj)

// console.log(os.type())
// console.log(os.freemem())
// console.log(emitter)

// console.log(fs.readdir("./", (err, files) =>{
//     if (err) console.log("Error",err)
//     else console.log(files)
// }))

const EventEmiter = require("events");
const http = require("http")

const Logger = require("./logger");
const logger = new Logger();

logger.on("messageLogged", (arg) => {
  console.log("listner called", arg);
});

logger.log("emitter message");


const server = http.createServer((req,res)=>{
    if(req.url === "/"){
        res.write(JSON.stringify([1,2,3]));
        res.end()
    }
});

server.on("conection", (socket) =>{
    console.log("new connection")
});

server.listen(3000)