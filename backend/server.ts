export {};
const dotenv = require("dotenv");

const app = require("./app");

// Setting Up Config File
dotenv.config({path: "backend/config/config.env"});

const port = (process.env.PORT || 5000) as number;

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} in ${process.env.NODE_ENV} mode`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
