import Contact from "../../models/Contact.js";
import { HttpError } from "../../helpers/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Not found contact with id=${contactId}!`);
  }
  res.json(result);
};

export default ctrlWrapper(updateById);
