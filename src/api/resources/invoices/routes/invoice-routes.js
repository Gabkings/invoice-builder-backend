import express from "express";

import invoiceController from "../controllers/invoice.controller";

export const invoiceRoutes = express.Router();

invoiceRoutes
  .route("/invoices")
  .get(invoiceController.findAll)
  .post(invoiceController.createInvoice);

invoiceRoutes
  .route("/invoices/:id")
  .get(invoiceController.findOne)
  .delete(invoiceController.findOneDelete)
  .put(invoiceController.update);

// invoiceRoutes.post("/invoices", invoiceController.createInvoice);

// invoiceRoutes.get("/invoices/:id", invoiceController.findOne);

// invoiceRoutes.delete("/invoices/:id", invoiceController.findOneDelete);
// invoiceRoutes.put("/invoices/:id", invoiceController.update);
