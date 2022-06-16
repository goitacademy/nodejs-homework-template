import models from "../../models/index.js";

const { contactModel } = models;
const { Contact } = contactModel;

export const getAll = async (req, res) => {
  const result = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    message: "Contacts received",
    data: {
      result,
    },
  });
};
