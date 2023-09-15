import Contact from "../../models/Contact.js";
import {ctrlWrapper} from "../../decorators/index.js";

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json({ message: "Contact deleted" });
};

export default {
  removeContactById: ctrlWrapper(removeContactById),
};
