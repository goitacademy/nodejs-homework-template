import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
    updateContact,
} from '../models/services/contacts.js';

// import contactsSchema from '../routes/api/middleware.js'
  
//перероблено на монгус

//GET list of contacts
export const getAllContacts = async (req, res, next) => {
    const allContacts = await listContacts();
        res.json(allContacts);
};

//GET contact by Id
export const getIdOfContact = async (req, res, next) => {
        const { contactId } = req.params;
        const contactById = await getContactById(contactId);
       
    if (getIdOfContact) {
            res.json(contactById)
        } else {
            res.status(404).json({ message: `${contactId} not found` })
        };
};

//POST contact
export const postNewContact = async (req, res, next) => {
    const { err } = contactsSchema.validate(req.body);
    
        if (err) {
            console.log(err.message)
        }
        const data = await addContact(req.body);
        res.status(201).json({ message: data });
    };

//DELETE contact by Id
export const deleteContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const deleteContact = await removeContact(contactId);

    if (deleteContact) {
      res.json({ message: `${contactId} deleted` });
    } else {
      res.status(404).json({ message: ` ${contactId} Not found ` });
    };
};

//PUT/Add contact
export const changeContact = async (req, res, next) => {
        const { err } = contactsSchema.validate(req.body);
        if (err) {
              console.log(err.message)
        }
    const { contactId } = req.parms;
    
        const changedContact = await updateContact(contactId, req.body);
        
    if (changedContact) {
            res.status(200).json(changedContact)
        } else {
            return res.status(404).json({ message: ` ${contactId} Not found ` });
        }
};

//PATCH favourite
export const changeContactByPatch = async (req, res, next) => {
    const { contactId } = req.params;
    const { favourite } = req.body;
    const updateStatusContact = await updateContact(contactId, { favourite });

    if (updateStatusContact) {
        res.status(200).json({updateStatusContact})
    } else {
        return res.status(404).json({ message: 'missing field favorite'});
    }

}


