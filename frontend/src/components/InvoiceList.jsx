import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const InvoiceList = () => {
	const [invoices, setInvoices] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const response = await axios.get(`${backendURL}/invoices/due`);
				setInvoices(response.data);
			} catch (error) {
				console.error('Error fetching invoices:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchInvoices();
	}, []);
	// useEffect(() => {
	// 	const fetchInvoices = async () => {
	// 		const dummyInvoices = [
	// 			{
	// 				id: "1",
	// 				amount: 500,
	// 				dueDate: "2025-02-15T00:00:00Z",
	// 				recipient: "John Doe",
	// 				status: "due"
	// 			},
	// 			{
	// 				id: "2",
	// 				amount: 300,
	// 				dueDate: "2025-03-10T00:00:00Z",
	// 				recipient: "Jane Smith",
	// 				status: "due"
	// 			},
	// 		];
	// 		setInvoices(dummyInvoices);
	// 		setLoading(false);
	// 	};

	// 	fetchInvoices();
	// }, []);

	const handleTriggerAutomation = async (invoiceId) => {
		try {
			const response = await axios.post(`${backendURL}/automation/trigger`, {
				invoiceId,
			});
			console.log('Automation triggered for invoice ID:', invoiceId);
			console.log('Response:', response.data);
		} catch (error) {
			console.error('Error triggering automation:', error);
		}
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="overflow-x-auto mt-10">
			<table className="min-w-full table-auto">
				<thead>
					<tr className="bg-gray-200">
						<th className="px-6 py-3 text-left text-gray-600">S.No</th>
						<th className="px-6 py-3 text-left text-gray-600">Invoice Amount</th>
						<th className="px-6 py-3 text-left text-gray-600">Due Date</th>
						<th className="px-6 py-3 text-left text-gray-600">Recipient</th>
						<th className="px-6 py-3 text-left text-gray-600">Status</th>
						<th className="px-6 py-3 text-left text-gray-600">Action</th>
					</tr>
				</thead>
				<tbody>
					{invoices.map((invoice, index) => (
						<tr key={invoice.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
							<td className="px-6 py-3">{index + 1}</td>
							<td className="px-6 py-3">{invoice.amount}</td>
							<td className="px-6 py-3">{new Date(invoice.dueDate).toLocaleDateString()}</td>
							<td className="px-6 py-3">{invoice.recipient}</td>
							<td className="px-6 py-3">{invoice.status}</td>
							<td className="px-6 py-3">
								{invoice.status === 'due' && (
									<button
										onClick={() => handleTriggerAutomation(invoice.id)}
										className="px-4 py-2 bg-blue-500 text-white rounded"
									>
										Trigger Automation
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default InvoiceList;
