require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

const DB_URI = process.env.MONGO_URL;

const connectDatabase = () => {
   mongoose
      .connect(DB_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then((data) => {
         console.log(`MongoDB is connected at ${data.connection.host}`);
      });
};

connectDatabase();
