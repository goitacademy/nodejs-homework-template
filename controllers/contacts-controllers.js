const contactsService = require('../models/contacts-service');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators'); // try...catch wrapper!

const getAllContacts = async (req, res) => { // - controler function req->res

      const result = await contactsService.listContacts();
      res.json(result);

}

const getContactById = async (req, res) => { // controler function req.params->res (console.log(req.params);)
      
    const {id} = req.params;
    const result = await contactsService.getContactById(id);
    if(!result) {
    throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404) using helpers messages
    }
    res.json(result);

}

const addContact = async (req, res) => { // controler function req-res

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);

}

const deleteContactById = async (req, res) => { // controler function req-res

      const { id } = req.params;
      const result = await contactsService.removeContact(id);
      if(!result) {
        throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404) using helpers messages
      }
      res.json({"message": "Contact deleted"});

}

const updateContactById = async (req, res) => { // controler function req-res

      const { id } = req.params;
      const result = await contactsService.updateContact(id, req.body);
      if(!result) {
        throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404); using helpers messages
      }
      res.json(result);

}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
}