const InvoiceSchema = require("../models/Invoice.js");

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
        const {status, amount} = req.body;
        const id = req.params.id;
        const fieldsToUpdate = {status, amount}
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

const getAllInvoices = async( req, res ) => {
    try {
        const userId = req.user.userId;
        const invoices = await InvoiceSchema.find({userId});
        res.status(200).send({invoices});
    } catch (error) {
        console.log("Error in the createInvoice, ", error);
        res.status(500).send({error: "Internal server error..."});
    }
}

module.exports = { createInvoice, updateInvoice, getAllInvoices };
