import { Contact } from '../../schemas/contacts.js';
import { HttpError } from "../../helpers/HttpErrors.js";
import { ctrlWrapper } from "../../helpers/ctrlWraper.js";

export const del = async (req, res, next) => {
  const { id } = req.params
    const result = await Contact.findByIdAndRemove({ _id: id })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Not found contact id: ${id}`)
    }
}

export const delContact = ctrlWrapper(del)