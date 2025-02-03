const InvoiceSchema = require("../models/Invoice.js");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const createInvoice = async( req, res ) => {
    try {
        const {email, full_name, dueDate, amount, status} = req.body;
        const userId = req.user.userId;
        const requiredFields = {email, full_name, dueDate, amount, status, userId};
        const missingFields = [];
        Object.keys(requiredFields).forEach((key) => {
            if(requiredFields[key] === undefined)
            {
                missingFields.push(key);
            }
        });
        if(missingFields.length > 0)
        {
            return res.status(400).send({error: `${missingFields} are missings...`});
        }
        const newInvoice = new InvoiceSchema(requiredFields);
        await newInvoice.save();
        res.status(201).send({newInvoice, message: "Invoice created..."});

    } catch (error) {
        console.log("Error in the createInvoice, ", error);
        res.status(500).send({error: "Internal server error..."});
    }
}

const updateInvoice = async( req, res ) => {
    try {
        const {full_name, status, amount, dueDate} = req.body;
        const id = req.params.id;
        const fieldsToUpdate = {full_name, status, amount, dueDate}
        Object.keys(fieldsToUpdate).forEach((key) => {
            if(fieldsToUpdate[key] === undefined)
            {
                delete fieldsToUpdate[key];
            }
        });
        const updatedInvoice = await InvoiceSchema.findByIdAndUpdate(id, fieldsToUpdate, {new: true, runValidators: true});
        if(!updatedInvoice)
        {
            return res.status(404).send({error: `Invoice not found with the Id : ${id}.`});
        }
        res.status(200).send({message: "Invoice updated...", updatedInvoice});
    } catch (error) {
        console.log("Error in the updateInvoice, ", error);
        res.status(500).send({error: "Internal server error..."});
    }
}

const getAllInvoices = async (req, res) => {
    try {
      const invoices = await Invoice.find();
  
      console.log("Invoices from Database:", invoices);
  
      if (!invoices || invoices.length === 0) {
        return res.status(404).json({ message: "No invoices found" });
      }
  
      // Transform data to include `id` instead of `_id`
      const formattedInvoices = invoices.map((invoice) => ({
        id: invoice._id.toString(), // Convert MongoDB `_id` to `id`
        fullName: invoice.full_name,
        email: invoice.email,
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        status: invoice.status,
      }));
  
      res.status(200).json({ invoices: formattedInvoices });
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const downloadInvoice = async (req, res) => {
    try {
      const { invoiceId } = req.params;
  
      // Path where invoices are stored (modify this as needed)
      const filePath = path.join(__dirname, `../invoices/Invoice_${invoiceId}.pdf`);
  
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Invoice file not found" });
      }
  
      // Send the file to the frontend
      res.download(filePath, `Invoice_${invoiceId}.pdf`);
    } catch (error) {
      console.error("Error in downloadInvoice:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  




const sendMail = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging: Log incoming request data

    const { invoiceId, fullName, email, amount, dueDate } = req.body;

    if (!invoiceId || !fullName || !email || !amount || !dueDate) {
      return res.status(400).json({ error: `Missing required fields: ${!invoiceId ? "invoiceId " : ""}${!fullName ? "fullName " : ""}${!email ? "email " : ""}${!amount ? "amount " : ""}${!dueDate ? "dueDate " : ""}` });
    }

    const webhookUrl = "https://hooks.zapier.com/hooks/catch/21543996/2fptmg9/";

    const data = { invoiceId, fullName, email, amount, dueDate };

    console.log("Sending Data to Zapier:", data); // Debugging: Log the outgoing request

    const response = await axios.post(webhookUrl, data);

    if (response.status === 200) {
      return res.status(200).json({ message: `Mail sent to ${email}` });
    } else {
      return res.status(500).json({ error: "Failed to trigger Zapier webhook" });
    }
  } catch (error) {
    console.error("Error in sendMail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





module.exports = { createInvoice, updateInvoice, getAllInvoices, sendMail,downloadInvoice };
