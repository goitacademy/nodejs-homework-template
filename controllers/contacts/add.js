import operations from "../../models/contacts/index.js";

export const add = async (req, res) => {
  const result = await operations.addContact(req.body);
  res.status(201).json({
    status: "success",
    message: "Contact added",
    code: 201,
    data: {
      result,
    },
  });
};
