import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({ status: "success", code: 200, data: { result } });
};

export default updateFavorite;
