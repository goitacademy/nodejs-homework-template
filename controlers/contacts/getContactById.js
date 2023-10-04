import { Contact } from '../../schemas/contacts.js';
import { HttpError } from "../../helpers/HttpErrors.js";
import { ctrlWrapper } from "../../helpers/ctrlWraper.js";

export const getById = async (req, res, next) => {
  const { id } = req.params
    const result = await Contact.findById(id);
      if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Contact with ${id} not found`)
    }
}

export const getContactById = ctrlWrapper(getById)