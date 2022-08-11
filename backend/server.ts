export {};
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const app = require("./app");
const connectDataBase = require("./config/database");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting Down the Server Due to Uncaught Exception");
  process.exit(1);
});

// Setting Up Config File
dotenv.config({path: "./config/config.env"});

const port = (process.env.PORT || 5000) as number;

// Connect to the DB
connectDataBase();

// Setting up Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} in ${process.env.NODE_ENV} mode`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err: Error) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting Down the Server Due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
