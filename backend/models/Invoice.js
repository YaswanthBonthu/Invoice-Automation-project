const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    default: 0.0,
  },
  dueDate: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: { 
    type: String, 
    enum: ["due", "overdue", "completed"],
    default: "due"
  },
}, {timestamps: true});

module.exports = mongoose.model("Invoice", InvoiceSchema);
