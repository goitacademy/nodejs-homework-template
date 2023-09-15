import Contact from "../../models/Contact.js";
import {ctrlWrapper} from "../../decorators/index.js";

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  // console.log(result);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

export default {
  updateContactById: ctrlWrapper(updateContactById),
};
