import * as contactsService from "../models/contacts.js";

const getAll = async (req, res, next) => {
  const data = await contactsService.listContacts();
  res.json(data);
};

export default { getAll };
