import API from "./axios";

export const fetchInvoices = async () => {
  const response = await API.get("/invoices/due");
  return response.data;
};
