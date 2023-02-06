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
    const { _id: owner } = req.user;
    let {
        page = 1,
        limit = 20,
        favorite,
    } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const contacts = await listContacts(owner, { skip, limit, favorite });
    
    res.status(200).json({contacts, page, limit});
}

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const contact = await getContactById(contactId, owner);

    if (!contact) {
        throw new NotFoundError("Not found");
    }

    res.status(200).json({contact});
};

const createContact = async (req, res, next) => {
    const { name, email, phone, favorite } = req.body;
    const { _id: owner } = req.user;

    const newContact = await addContact(name, email, phone, favorite, owner);

    res.status(201).json({newContact});
};

const removeContact = async (req, res, next) => {
    const { _id: owner } = req.user;

    const deletedContact = await deleteContact(req.params.contactId, owner);

    if (!deletedContact) {
      throw new NotFoundError(`Contact with id '${req.params.contactId}' not found`);
    };
  
    res.status(200).json({message: 'contact deleted'});
};

const changeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const { _id: owner } = req.user;

    const updatedContact = await updateContact(contactId, name, email, phone, favorite, owner);

    if (!updatedContact) {
      throw new NotFoundError(`Contact with id '${contactId}' not found`);
    };

    res.status(200).json({ updatedContact });
};

const patchContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { _id: owner } = req.user;
    
    const updatedContact = await updateStatusContact(contactId, favorite, owner);

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

