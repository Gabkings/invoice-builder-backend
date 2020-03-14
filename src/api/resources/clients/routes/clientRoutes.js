import express from "express";
import clientController from "../controllers/clientController";

export const clientRouter = express.Router();

clientRouter
  .route("/clients")
  .get(clientController.getClients)
  .post(clientController.createlient);

clientRouter
  .route("/clients/:id")
  .get(clientController.findOne)
  .put(clientController.update)
  .delete(clientController.findOneDelete);
