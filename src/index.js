const express = require("express");
import mongoose from "mongoose";
import morgan from "morgan";
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/invoice-builder")
  .then(console.log("connected"))
  .catch(err => console.log(err));
const app = express();
import { router } from "./config/routes";
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use("/api", router);
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  error.message = "Invalid route";
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
