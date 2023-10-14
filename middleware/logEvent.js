const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logEvent = async (message, logFilename) => {
  const dateTime = `${format(new Date(), "MMM/dd/yyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "log"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "log"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "log", logFilename),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req,res,next) => {
  logEvent(`${req.url}\t${req.method}\t${req.headers.origin}`,"reqLog.txt" )
  next()
}

module.exports = {logEvent, logger};
