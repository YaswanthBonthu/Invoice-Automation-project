import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import EditInvoicePopup from "./EditInvoicePopup";
import AddInvoicePopup from "./AddInvoicePopup";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendURL}/invoices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(response.data.invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (invoiceId) => {
	try {
	  const token = localStorage.getItem("token");
  
	  const response = await axios.get(
		`${backendURL}/invoices/download/${invoiceId}`, 
		{
		  headers: { Authorization: `Bearer ${token}` },
		  responseType: "blob", // Ensure response is a file
		}
	  );
  
	  // Create a Blob from the PDF Stream
	  const blob = new Blob([response.data], { type: "application/pdf" });
	  const link = document.createElement("a");
	  link.href = window.URL.createObjectURL(blob);
	  link.download = `Invoice_${invoiceId}.pdf`;
	  document.body.appendChild(link);
	  link.click();
	  document.body.removeChild(link);
  
	  console.log(`Invoice ${invoiceId} downloaded successfully.`);
	} catch (error) {
	  console.error("Error downloading invoice:", error);
	  alert("Failed to download invoice.");
	}
  };
  

  // Function to handle the "Remind" button click
  const handleRemind = async (invoice) => {
	try {
	  const token = localStorage.getItem("token");
  
	  // Debugging log
	  console.log("Invoice Sent to handleRemind:", invoice);
  
	  if (!invoice._id || !invoice.email || !invoice.full_name || !invoice.amount || !invoice.dueDate) {
		alert("Missing invoice data. Cannot send reminder.");
		return;
	  }
  
	  const data = {
		invoiceId: invoice._id,  // Use _id instead of id
		fullName: invoice.full_name,
		email: invoice.email,
		amount: invoice.amount,
		dueDate: invoice.dueDate,
	  };
  
	  console.log("Final Request Payload:", data); // Debugging
  
	  const response = await axios.post(
		`${backendURL}/invoices/mail`, 
		data,
		{
		  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
		}
	  );
  
	  if (response.status === 200) {
		alert("Invoice reminder sent successfully!");
	  } else {
		alert("Failed to send reminder.");
	  }
	} catch (error) {
	  console.error("Error sending reminder:", error);
	  alert("Error sending reminder.");
	}
  };
  
  
  

  useEffect(() => {
    fetchInvoices();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
	<div className="px-16 py-10">
	  <div className="flex justify-between items-center mb-4">
		<h2 className="text-xl font-bold">Invoices</h2>
		<button
		  onClick={() => setIsAdding(true)}
		  className="px-4 py-2 bg-green-500 text-white rounded"
		>
		  + Add Invoice
		</button>
	  </div>
	  <table className="min-w-full table-auto">
		<thead>
		  <tr className="bg-black text-white">
			<th className="px-6 py-3">S.No</th>
			<th className="px-6 py-3">Invoice Amount</th>
			<th className="px-6 py-3">Due Date</th>
			<th className="px-6 py-3">Recipient</th>
			<th className="px-6 py-3">Status</th>
			<th className="px-6 py-3">Action</th>
		  </tr>
		</thead>
		<tbody>
		  {invoices.length === 0 ? (
			<tr>
			  <td colSpan="6" className="px-6 py-20 text-center text-gray-500 bg-gray-200">
				No invoices available
			  </td>
			</tr>
		  ) : (
			invoices.map((invoice, index) => {
			  console.log("Rendering Invoice:", invoice); // Debugging
  
			  return (
				<tr key={invoice._id || index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
				  <td className="px-6 py-3 text-center">{index + 1}</td>
				  <td className="px-6 py-3 text-center">{invoice.amount}</td>
				  <td className="px-6 py-3 text-center">
					{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "N/A"}
				  </td>
				  <td className="px-6 py-3 text-center">{invoice.full_name || "Unknown"}</td>
				  <td className="px-6 py-3 text-center">{invoice.status || "Pending"}</td>
				  <td className="px-6 py-3 flex justify-center gap-2">
					{invoice.status !== "completed" ? (
					  <>
						<button
						  onClick={() => {
							console.log("Invoice Sent to handleRemind:", invoice);
							handleRemind(invoice);
						  }}
						  className="px-4 py-2 bg-blue-500 text-white rounded"
						>
						  Remind
						</button>
						<button
						  onClick={() => handleEdit(invoice)}
						  className="px-4 py-2 bg-green-500 text-white rounded"
						>
						  Edit
						</button>
					  </>
					) : (
						<button
						onClick={() => handleDownload(invoice._id)} // Added the onClick event
						className="px-4 py-2 bg-blue-500 text-white rounded"
					  >
						Download
					  </button>
					  
					)}
				  </td>
				</tr>
			  );
			})
		  )}
		</tbody>
	  </table>
	  
	  {selectedInvoice && (
		<EditInvoicePopup
		  invoice={selectedInvoice}
		  onClose={() => setSelectedInvoice(null)}
		  onFetch={() => fetchInvoices()}
		/>
	  )}
	  
	  {isAdding && (
		<AddInvoicePopup
		  onClose={() => setIsAdding(false)}
		  onFetch={() => fetchInvoices()}
		/>
	  )}
	</div>
  );
};

export default InvoiceList;
