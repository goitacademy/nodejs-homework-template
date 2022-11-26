import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
    updateContact,
} from '../models/contacts.js';
import contactsSchema from '../routes/api/middleware.js'
  
//GET list of contacts
export const getAllContacts = async (req, res, next) => {
    try {
        const allContacts = await listContacts();
        res.json(allContacts);
    } catch (err) {
        console.log(err.message);
    };
};

//GET contact by Id
export const getIdOfContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contactById = await getContactById(contactId);
        if (getIdOfContact) {
            res.json(contactById)
        } else {
            res.status(404).json({ message: `${contactId} not found` })
        };
    } catch (err) {
        console.log(err.message)
    };
};

//POST contact
export const postNewContact = async (req, res, next) => {
    try {
        const { err } = contactsSchema.validate(req.body);
        if (err) {
            console.log(err.message)
        }
        const data = await addContact(req.body);
        res.status(201).json({ message: data });
    } catch (err) {
        console.log(err.message)
    }
};

//DELETE contact by Id
export const deleteContactById = async (req, res, next) => {
    try {
    const { contactId } = req.params;
    const deleteContact = await removeContact(contactId);

    if (deleteContact) {
      res.json({ message: `${contactId} deleted` });
    } else {
      res.status(404).json({ message: ` ${contactId} Not found ` });
    };
  } catch (err) {
   console.log(err.message)
  }
};

//PUT/Add contact
export const changeContact = async (req, res, next) => {
    try {
        const { err } = contactsSchema.validate(req.body);
        if (err) {
              console.log(err.message)
        }
        const { contactId } = req.parms;
        const changedContact = await updateContact(contactId, req.body);
        if (changedContact) {
            res.status(200).json(changeContact)
        } else {
            res.status(404).json({ message: ` ${contactId} Not found ` });
        }
    } catch (err) {
        console.log(err.message)
    }
};




