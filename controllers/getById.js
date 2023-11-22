import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Not found contact with id=${contactId}!`);
  }
  res.json(result);
};

export default ctrlWrapper(getById);
