const allowOrigin = require("../config/allowOrigin");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowOrigin.includes(origin)) {
    res.headers("Access-Control-Allow-Origin", true);
    // res.headers("Access-Control-Allow-Credentials", true)
  }
  next();
};

module.exports = credentials;