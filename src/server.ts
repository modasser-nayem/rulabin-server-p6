/* eslint-disable no-console */
import http, { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

const server: Server = http.createServer(app);

async function main() {
  try {
    await mongoose.connect(config.DB_URI as string);
    console.log("Database is connected...");
    server.listen(config.PORT, () => {
      console.log(`Server is listen on ${config.PORT}`);
    });
  } catch (error) {
    console.log("Server File Error = ", error);
    throw new Error("Something went wrong!");
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
