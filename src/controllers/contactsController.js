const {
    listContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    updateStatusContact,
} = require('../services/contactsService');

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({contacts});
}

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    res.status(200).json({contact});
};

const createContact = async (req, res, next) => {
    const {name, email, phone, favorite} = req.body;

    const newContact = await addContact(name, email, phone, favorite);

    res.status(201).json({newContact});
};

const removeContact = async (req, res, next) => {
    await deleteContact(req.params.contactId);
  
    res.status(200).json({message: 'contact deleted'});
};

const changeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;

    const updatedContact = await updateContact(contactId, name, email, phone, favorite);

    res.status(200).json({ updatedContact });
};

const patchContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    
    const updatedContact = await updateStatusContact(contactId, favorite);

    res.status(200).json({updatedContact});
};

module.exports = {
    getContacts,
    getById,
    createContact, 
    removeContact,
    changeContact,
    patchContact,
}

