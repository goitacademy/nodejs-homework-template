import * as contactsService from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';


export const getAll = async (req, res) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);
    }
    catch (error){
            res.status(500).json({message:error.message})
        }
};

export const getById = async (req, res) => {
  try {
      const { contactId } = req.params;
      const result = await contactsService.getContactById(contactId);
      if (!result) {
          throw HttpError(404, `Contact is not found`);
      }
      res.json(result);
  } catch (error) {
      const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
  }
};

