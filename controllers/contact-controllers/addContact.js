import Contact from "../../models/Contact.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

export default ctrlWrapper(addContact);
