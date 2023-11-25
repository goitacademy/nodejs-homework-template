import Contact from "../../models/Contact.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.json(result);
};

export default ctrlWrapper(getAllContacts);
