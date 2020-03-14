import Joi from "joi";
import HttpStatus from "http-status-codes";
import Client from "../models/clientModel";
export default {
  async createlient(req, res) {
    // let { item, due, qty, tax, rate } = req.body;
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Client.create(value)
      .then(client => res.json({ message: "Success", data: client }))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOne(req, res) {
    const { id } = req.params;
    Client.findById(id)
      .then(client => {
        if (!client) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ err: "Could not find any invoice" });
        }
        return res.status(HttpStatus.OK).json({ client });
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOneDelete(req, res) {
    const { id } = req.params;
    Client.findByIdAndRemove(id)
      .then(client => {
        if (!client) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ err: "Could not delete any invoice" });
        }
        return res.json({ message: "Deleted successfully" });
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    const { id } = req.params;
    const schema = Joi.object().keys({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      email: Joi.string().optional()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Client.findOneAndUpdate({ _id: id }, value, { new: true })
      .then(client => res.json(client))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  async getClients(req, res) {
    try {
      const clients = await Client.find();
      return res.status(HttpStatus.OK).json(clients);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
};
