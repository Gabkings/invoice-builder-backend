import mongoose from "mongoose";
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  due: {
    type: Date,
    required: true
  },
  rate: {
    type: Number
  },
  tax: {
    type: Number,
    required: true
  }
});

export default mongoose.model("Invoice", InvoiceSchema);
