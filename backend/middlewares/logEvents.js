const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    const logDir = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(logDir)) {
      await fsPromises.mkdir(logDir, { recursive: true });
    }

    await fsPromises.appendFile(path.join(logDir, logName), logItem);
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  const origin = req.headers.origin || "No Origin Header";
  logEvents(`${req.method}\t${origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports ={logEvents,logger}
