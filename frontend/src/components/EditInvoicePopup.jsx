import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const EditInvoicePopup = ({ invoice, onClose, onFetch }) => {
	const [submitData, setSubmitData] = useState({})

	const handleChange = (e) => {
		setSubmitData({ ...submitData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");

			const { data } = await axios.put(
				`${backendURL}/invoices/${invoice._id}`,
				submitData,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			toast.success(data.message || "Invoice Edited successfully!");
			onFetch();
			onClose();
		} catch (error) {
			const errorMessage = error.response?.data?.error || "Something went wrong. Try again.";

			toast.error(errorMessage);
			console.error("Error updating invoice:", error.response?.data || error.message);
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg w-96 shadow-lg">
				<h2 className="text-lg font-bold mb-4">Edit Invoice</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Amount Input */}
					<div>
						<label htmlFor="amount" className="block text-sm font-medium text-gray-700">
							Amount
						</label>
						<input
							type="number"
							id="amount"
							name="amount"
							value={invoice.amount}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							placeholder="Enter amount"
							required
						/>
					</div>

					{/* Due Date Input */}
					<div>
						<label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
							Due Date
						</label>
						<input
							type="date"
							id="dueDate"
							name="dueDate"
							value={invoice.dueDate.split("T")[0]}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							required
						/>
					</div>

					{/* Recipient Input */}
					<div>
						<label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
							Recipient Name
						</label>
						<input
							type="text"
							id="full_name"
							name="full_name"
							value={invoice.full_name}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							placeholder="Enter recipient name"
							required
						/>
					</div>

					{/* Status Select */}
					<div>
						<label htmlFor="status" className="block text-sm font-medium text-gray-700">
							Status
						</label>
						<select
							id="status"
							name="status"
							value={invoice.status}
							onChange={handleChange}
							className="w-full p-2 border rounded"
						>
							<option value="due">Due</option>
							<option value="completed">Paid</option>
							<option value="overdue">Overdue</option>
						</select>
					</div>

					{/* Buttons */}
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
