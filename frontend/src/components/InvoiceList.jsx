import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import EditInvoicePopup from './EditInvoicePopup';
import AddInvoicePopup from './AddInvoicePopup';

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
			const response = await axios.get(`${backendURL}/invoices`,
				{ headers: { Authorization: `Bearer ${token}` } });
			setInvoices(response.data.invoices);

		} catch (error) {
			console.error('Error fetching invoices:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchInvoices();
	}, []);

	// const handleTriggerAutomation = async (invoiceId) => {
	// 	try {
	// 		const response = await axios.post(`${backendURL}/automation/trigger`, {
	// 			invoiceId,
	// 		});
	// 		console.log('Automation triggered for invoice ID:', invoiceId);
	// 		console.log('Response:', response.data);
	// 	} catch (error) {
	// 		console.error('Error triggering automation:', error);
	// 	}
	// };

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="overflow-x-auto mt-10">
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
								<span className="flex items-center justify-center gap-2 text-xl">
									<svg
										className="w-16 h-16 text-gray-400"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m3 5H6a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h4a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
									</svg>
									No invoices available
								</span>
							</td>
						</tr>
					) : (
						invoices.map((invoice, index) => (
							<tr key={invoice.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
								<td className="px-6 py-3 text-center">{index + 1}</td>
								<td className="px-6 py-3 text-center">{invoice.amount}</td>
								<td className="px-6 py-3 text-center">{new Date(invoice.dueDate).toLocaleDateString()}</td>
								<td className="px-6 py-3 text-center">{invoice.full_name}</td>
								<td className="px-6 py-3 text-center">{invoice.status}</td>
								<td className="px-6 py-3 flex justify-center gap-2">
									{invoice.status !== 'completed' ?
										<>
											<button
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
										: <>
											<button
												className="px-4 py-2 bg-blue-500 text-white rounded"
											>
												Download
											</button>
										</>
									}
								</td>
							</tr>
						))
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
