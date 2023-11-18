
import * as contactsService from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js"
import tryCatchWrapper from "../../decorators/tryCatchWrapper.js";




const getAllContacts = async (req, res, next) => {
        const result = await contactsService.listContacts();
        res.json(result);
};

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsService.getContactsById(contactId);
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
    res.json(result);
}

const addContact = async (req, res, next) => {
    const { name, email, phone } = req.body;
    const result = await contactsService.addContact(name, email, phone);
    res.status(201).json(result);
}

const updateContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
    }
    res.json(result);

}

const deleteContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsService.removeContactById(contactId);
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
    res.status(204).send();
 
}

tryCatchWrapper(deleteContactById)

export default {
  getAllContacts: tryCatchWrapper(getAllContacts),
  getContactById: tryCatchWrapper(getContactById),
  addContact: tryCatchWrapper(addContact),
  updateContactById: tryCatchWrapper(updateContactById),
  deleteContactById: tryCatchWrapper(deleteContactById)
}