import Contact from "../models/Contact.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

export default ctrlWrapper(getAllContacts);
