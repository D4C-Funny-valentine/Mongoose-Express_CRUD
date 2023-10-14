require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const corsOption = require("./config/corsOption");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

//connect to mongoDB
connectDB();

app.use(logger);

// middleware for credentials
app.use(credentials);

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// middleware for cookie
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/roots"));
app.use("/login", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// middleware
app.use(verifyJWT);

app.use("/users", require("./routes/api/users"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
});
