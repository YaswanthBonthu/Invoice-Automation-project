const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const Invoice = require("../models/Invoice");
const { createInvoice, updateInvoice, getAllInvoices } = require("../controllers/invoiceController.js");

const router = express.Router();

router.post("/", authMiddleware, createInvoice);
router.put("/:id", authMiddleware, updateInvoice);
router.get("/", authMiddleware, getAllInvoices);

module.exports = router;
