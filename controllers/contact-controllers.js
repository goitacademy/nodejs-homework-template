import * as contactsService from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';


export const getAll = async (req, res,next) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);
    }
    catch (error){
            next(error)
        }
};

export const getById = async (req, res,next) => {
  try {
      const { contactId } = req.params;
      const result = await contactsService.getContactById(contactId);
      if (!result) {
          throw HttpError(404, `Contact is not found`);
      }
      res.json(result);
  } catch (error) {
      next(error);
  }
};

