import { Contact } from '../../schemas/contacts.js';
import { ctrlWrapper } from "../../helpers/ctrlWraper.js";

export const getAll = async (req, res, next) => {
    const results = await Contact.find()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
      },
    }) 
}

export const getAllContacts = ctrlWrapper(getAll)