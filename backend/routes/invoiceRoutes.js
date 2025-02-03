const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const { createInvoice, updateInvoice, getAllInvoices, sendMail } = require("../controllers/invoiceController.js");

const router = express.Router();

router.post("/", authMiddleware, createInvoice);
router.put("/:id", authMiddleware, updateInvoice);
router.get("/", authMiddleware, getAllInvoices);
router.post("/mail", authMiddleware, sendMail);
router.get("/download/:invoiceId", authMiddleware, downloadInvoice);


module.exports = router;
