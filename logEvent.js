const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logEvent = async (message, logFilename) => {
  const dateTime = `${format(new Date(), "MMM/dd/yyyy")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "log"))) {
      await fsPromise.mkdir(path.join(__dirname, "log"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "log", logFilename),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = logEvent;
