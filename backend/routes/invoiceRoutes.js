const express = require("express");
const Invoice = require("../models/Invoice");

const router = express.Router();

router.get("/due", async (req, res) => {
  const invoices = await Invoice.find({ status: "due" });
  res.json(invoices);
});

module.exports = router;
