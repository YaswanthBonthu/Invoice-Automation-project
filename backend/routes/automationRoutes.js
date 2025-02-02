const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/trigger", async (req, res) => {
  const { invoiceId } = req.body;
  try {
    await axios.post(process.env.ZAPIER_WEBHOOK_URL, { invoiceId });
    res.json({ message: "Zapier trigger successful" });
  } catch (error) {
    res.status(500).json({ message: "Error triggering Zapier" });
  }
});

module.exports = router;
