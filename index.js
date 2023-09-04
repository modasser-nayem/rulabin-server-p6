require("dotenv").config({ path: "./config/config.env" });
require("./config/database");
const app = require("./app");

// Handle UncaughtException Error
process.on("uncaughtException", (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Shutting Down the server due to Uncaught Exception Error`);
   process.exit(1);
});

const port = process.env.PORT | 5000;
const server = app.listen(port, () => {
   console.log(`SERVER IS RUNNING AT http://localhost:${port}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Shutting Down the server due to Unhandled Promise Rejection`);

   server.close(() => {
      process.exit(1);
   });
});
