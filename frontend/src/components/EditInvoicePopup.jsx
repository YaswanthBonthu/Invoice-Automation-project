import { useState } from "react";
import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const EditInvoicePopup = ({ invoice, onClose, onUpdate }) => {
	const [formData, setFormData] = useState({
		amount: invoice.amount,
		dueDate: invoice.dueDate,
		full_name: invoice.full_name,
		status: invoice.status,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.put(
				`${backendURL}/invoices/${invoice.id}`,
				formData
			);

			onUpdate(data); // Update invoice in the parent component
			onClose(); // Close the popup
		} catch (error) {
			console.error("Error updating invoice:", error.response?.data || error.message);
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg w-96 shadow-lg">
				<h2 className="text-lg font-bold mb-4">Edit Invoice</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="number"
						name="amount"
						value={formData.amount}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						placeholder="Amount"
						required
					/>
					<input
						type="date"
						name="dueDate"
						value={formData.dueDate.split("T")[0]}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
					<input
						type="text"
						name="full_name"
						value={formData.full_name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						placeholder="Recipient"
						required
					/>
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					>
						<option value="due">Due</option>
						<option value="completed">Paid</option>
						<option value="overdue">Overdue</option>
					</select>
					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-500 text-white rounded"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded"
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditInvoicePopup;
