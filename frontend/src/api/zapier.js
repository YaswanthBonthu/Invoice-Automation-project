import API from "./axios";

export const triggerZapier = async (invoice) => {
  await API.post("/automation/trigger", { invoiceId: invoice._id });
};
