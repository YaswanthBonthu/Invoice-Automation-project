import { useEffect, useState } from "react";
import { fetchInvoices } from "../api/invoices";
import { triggerZapier } from "../api/zapier";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices().then(setInvoices);
  }, []);

  const handleSendReminder = async (invoice) => {
    await triggerZapier(invoice);
    alert("Reminder sent!");
  };

  return (
    <div>
      <h2>Due Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice._id}>
            {invoice.recipient} - ${invoice.amount} (Due: {invoice.dueDate})
            <button onClick={() => handleSendReminder(invoice)}>Send Reminder</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
