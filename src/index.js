const express = require("express");
import mongoose from "mongoose";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/invoice-builder")
  .then(console.log("connected"))
  .catch(err => console.log(err));
const app = express();
import swaggerDocument from "./config/swagger.json";
import { invoiceRoutes } from "./api/resources/invoices";
import { clientRouter } from "./api/resources/clients";

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    explorer: true
  })
);
app.use(cors());
app.use("/api", invoiceRoutes);
app.use("/api", clientRouter);
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
