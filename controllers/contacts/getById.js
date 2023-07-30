import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({ status: "succes", code: 200, data: { result } });
};
export default getById;
