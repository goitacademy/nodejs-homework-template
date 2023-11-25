import Contact from "../../models/Contact.js";
import { HttpError } from "../../helpers/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Not found contact with id=${contactId}!`);
  }
  res.json({ message: "contact deleted" });
};

export default ctrlWrapper(deleteById);
