const {Contact} = require('../schemas/contactsSchema');
const {HttpError, ctrlWrapper} = require('../utility');

async function listContacts (req, res) {
    const result = await Contact.find();
    res.json(result);
}

async function getContactById(req, res) {
    const {contactId} = req.params;
    const result = await Contact.findById(contactId);
    if(!result){
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

async function removeContact(req, res) {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if(!result){
        throw HttpError(404, 'Not found');
    }
    res.json({message: 'contact deleted'});
}
  
async function addContact(req, res) {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

async function updateContact(req, res) {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result){
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

async function updateStatusContact(req, res) {
    const {contactId} = req.params;
    const result = await Contact.findById(contactId);
    if(!result){
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    removeContact: ctrlWrapper(removeContact),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact)
}