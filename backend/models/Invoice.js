const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  dueDate: Date,
  recipient: String,
  status: { type: String, default: "due" },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
