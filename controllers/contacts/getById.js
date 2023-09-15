import Contact from "../../models/Contact.js";
import {ctrlWrapper} from "../../decorators/index.js";

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  res.json(result);
};

export default {
  getById: ctrlWrapper(getById),
};
