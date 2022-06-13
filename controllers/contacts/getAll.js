import operations from "../../models/contacts/index.js";

export const getAll = async (req, res) => {
  const result = await operations.listContacts();
  res.json({
    status: "success",
    code: 200,
    message: "Contacts received",
    data: {
      result,
    },
  });
};
