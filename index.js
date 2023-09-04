require("dotenv").config({ path: "./config/config.env" });
require("./config/database");
const app = require("./app");

const port = process.env.PORT | 5000;
app.listen(port, () => {
   console.log(`SERVER IS RUNNING AT http://localhost:${port}`);
});
