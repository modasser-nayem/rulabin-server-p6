const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");

// Using app Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
   res.json({ message: "Welcome to Rulabin Server" });
});

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
