const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    // .connect(process.env.DB_LOCAL_URI, {
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con: {connection: {host: string}}) => {
      // console.log({con});
      console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    });
};

module.exports = connectDatabase;
