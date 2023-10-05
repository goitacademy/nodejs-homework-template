import Contact from "../../models/contact-model.js";

import {HttpError} from "../../helpers/index.js";

import {ctrlWrapper} from "../../decorators/index.js";

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  };

  export default ctrlWrapper(updateStatusContact);