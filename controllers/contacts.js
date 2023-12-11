
const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper  } = require("../helpers");



const getAll = async (req, res) => {
  
  const result = await Contact.find();
    res.json(result);
  
}

// const getContactById = async (req, res) => {
  
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);

//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);

// }

const addContact = async (req, res) => {
  
    result = await Contact.create(req.body);
    res.status(201).json(result);

}

// const deleteContactByID = async (req, res) => {
  
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({
//       message: "Delete success",
//     });
// }
// const updateContactByID = async (req, res) => {
  
    
//     const { contactId } = req.params;

//     const result = await contacts.updateContact(contactId, req.body);

//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
  
// }

module.exports = {
    getAll: ctrlWrapper(getAll),
    // getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    // deleteContactByID: ctrlWrapper(deleteContactByID),
    // updateContactByID: ctrlWrapper(updateContactByID),
    };