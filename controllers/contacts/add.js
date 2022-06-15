import models from "../../models/index.js";

const { contactModel } = models;
const { Contact } = contactModel;

export const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Contact added",
    code: 201,
    data: {
      result,
    },
  });
};
