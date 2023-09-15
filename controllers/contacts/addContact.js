import Contact from "../../models/Contact.js";
import {ctrlWrapper} from "../../decorators/index.js";

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json(newContact);
};

export default {
  addContact: ctrlWrapper(addContact),
};
