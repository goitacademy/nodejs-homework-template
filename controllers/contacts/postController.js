import model from "../../models/contacts/index";

export const postContact = async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json(newContact);
};
