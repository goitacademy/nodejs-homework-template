const {
    listContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
} = require('../models/contacts');

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({contacts, status: 'success'});
}

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        return res.status(404).json({
        message: "Not found",
        });
    }

    res.status(200).json({contact, status: 'success'});
};

const createContact = async (req, res, next) => {
    const {name, email, phone} = req.body;

    const newContact = await addContact(name, email, phone);
    
    if (!newContact) {
        return res.status(404).json({
        message: "missing required name field",
        });
    }

    res.status(201).json({newContact, status: 'success'});
};

const removeContact = async (req, res, next) => {
    const deletedContact = await deleteContact(req.params.contactId);

    if (!deletedContact) {
        return res.status(404).json({
        message: "Not found",
        });
    }
  
    res.status(200).json({message: 'contact deleted'});
};

const changeContact = async (req, res, next) => {
    const { contactId } = req.params;

    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
        return res.status(400).json({
        message: "missing fields",
        });
    }

    res.status(200).json({updatedContact, status: 'success'});

};

const patchContact = async (req, res, next) => {
//   const {name, email, phone} = req.body;

//   contacts.forEach((contact) => {
//     if (contact.id === req.params.contactId) {
//       if (name) {
//         contact.name = name;
//       }
//       if (email) {
//         contact.email = email;
//       }
//       if (phone) {
//         contact.phone = phone;
//       }
//     }
//   });

//   res.json({status: 'success'});
};

module.exports = {
    getContacts,
    getById,
    createContact, 
    removeContact,
    changeContact,
    patchContact
}

