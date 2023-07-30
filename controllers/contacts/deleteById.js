import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.status(200).json({ message: "contact deleted" });
};

export default deleteById;
