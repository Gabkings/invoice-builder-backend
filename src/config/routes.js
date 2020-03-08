import invoiceController from "../api/controllers/invoice.controller";

const express = require("express");

export const router = express.Router();

//invoices route

router.get("/invoices", invoiceController.findAllInvoices);

router.post("/invoices", invoiceController.createInvoice);

router.get("/invoices/:id", invoiceController.findOne);

router.delete("/invoices/:id", invoiceController.findOneDelete);
router.patch("/invoices/:id", invoiceController.update);
