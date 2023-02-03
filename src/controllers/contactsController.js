const {
    listContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    updateStatusContact,
} = require('../services/contactsService');
const { NotFoundError } = require('../helpers/errors');

const getContacts = async (req, res, next) => {
    const { _id: userId } = req.user;

    const contacts = await listContacts(userId);
    res.status(200).json({contacts});
}

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const contact = await getContactById(contactId, userId);

    if (!contact) {
        throw new NotFoundError("Not found");
    }

    res.status(200).json({contact});
};

const createContact = async (req, res, next) => {
    const { name, email, phone, favorite } = req.body;
    const { _id: userId } = req.user;

    const newContact = await addContact(name, email, phone, favorite, userId);

    res.status(201).json({newContact});
};

const removeContact = async (req, res, next) => {
    const { _id: userId } = req.user;

    const deletedContact = await deleteContact(req.params.contactId, userId);

    if (!deletedContact) {
      throw new NotFoundError(`Contact with id '${req.params.contactId}' not found`);
    };
  
    res.status(200).json({message: 'contact deleted'});
};

const changeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const { _id: userId } = req.user;

    const updatedContact = await updateContact(contactId, name, email, phone, favorite, userId);

    if (!updatedContact) {
      throw new NotFoundError(`Contact with id '${contactId}' not found`);
    };

    res.status(200).json({ updatedContact });
};

const patchContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { _id: userId } = req.user;
    
    const updatedContact = await updateStatusContact(contactId, favorite, userId);

    if (!updatedContact) {
      throw new NotFoundError(`Contact with id '${contactId}' not found`);
    };

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

