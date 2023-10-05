import { Contact } from '../../schemas/contacts.js';
import { HttpError } from "../../helpers/HttpErrors.js";
import { ctrlWrapper } from "../../helpers/ctrlWraper.js";

export const update = async (req, res, next) => {
  const { id } = req.params
  const { name, email, phone } = req.body
    const { error } = req.body;
    if (error) {
      throw HttpError(400, `Missing required name field`)
    }
    const result = await Contact.findByIdAndUpdate({ _id: id }, { name, email, phone }, { new: true })
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

export const updateContact = ctrlWrapper(update)