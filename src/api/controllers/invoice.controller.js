import Joi from "joi";
import HttpStatus from "http-status-codes";
import Invoice from "../models/invoice.models";
export default {
  findAllInvoices(req, res, next) {
    Invoice.find()
      .then(invoices => res.json(invoices))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  createInvoice(req, res) {
    // let { item, due, qty, tax, rate } = req.body;
    const schema = Joi.object().keys({
      item: Joi.string().required(),
      due: Joi.date().required(),
      qty: Joi.number().required(),
      tax: Joi.number().required(),
      rate: Joi.number().optional()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Invoice.create(value)
      .then(invoice => res.json(invoice))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOne(req, res) {
    let { id } = req.params;
    Invoice.findOne({ id })
      .then(invoice => {
        if (!invoice) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ error: "Could not find Invoice" });
        }
        return res.status(HttpStatus.OK).json(invoice);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOneDelete(req, res) {
    const { id } = req.params;
    Invoice.findByIdAndRemove(id)
      .then(invoice => {
        if (!invoice) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ err: "Could not delete any invoice" });
        }
        return res.json(invoice);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    const { id } = req.params;
    const schema = Joi.object().keys({
      item: Joi.string().optional(),
      date: Joi.date().optional(),
      due: Joi.date().optional(),
      qty: Joi.number()
        .integer()
        .optional(),
      tax: Joi.number().optional(),
      rate: Joi.number().optional()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Invoice.findOneAndUpdate({ _id: id }, value, { new: true })
      .then(invoice => res.json(invoice))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  }
};
