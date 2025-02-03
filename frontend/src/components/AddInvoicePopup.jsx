import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const AddInvoicePopup = ({ onClose, onFetch }) => {
	const [formData, setFormData] = useState({
		email: "",
		full_name: "",
		dueDate: "",
		amount: "",
		status: "due",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");
			const { data } = await axios.post(
				`${backendURL}/invoices`,
				formData,
				{ headers: { Authorization: `Bearer ${token}` } }
			);			
			toast.success(data.message || "Invoice created successfully!");
			onFetch();
			onClose();
		} catch (error) {
			const errorMessage = error.response?.data?.error || "Something went wrong. Try again.";

			toast.error(errorMessage);
			console.error("Error adding invoice:", errorMessage);
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg w-96 shadow-lg">
				<h2 className="text-lg font-bold mb-4">Add Invoice</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						placeholder="Email"
						required
					/>
					<input
						type="text"
						name="full_name"
						value={formData.full_name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						placeholder="Full Name"
						required
					/>
					<input
						type="date"
						name="dueDate"
						value={formData.dueDate}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
					<input
						type="number"
						name="amount"
						value={formData.amount}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						placeholder="Amount"
						required
					/>
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					>
						<option value="due">Due</option>
						<option value="paid">Paid</option>
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
							className="px-4 py-2 bg-green-500 text-white rounded"
						>
							Add Invoice
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddInvoicePopup;
