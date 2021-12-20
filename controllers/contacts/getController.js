import model from "../../models/contacts/index";

export const getContactList = async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
};
