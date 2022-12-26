// const contactsOperations = require("../model/contacts");
const {Contacts} = require("../model")
const {  ctrlWrapper } = require("../helpers");

// HttpError,





const getAll = async (req, res) => {
    const result = await Contacts.find({})
    res.json(result)
};

// const getById = async (req, res) => {
    
//         const { contactId } = req.params;
//         const result = await contactsOperations.getContactById(contactId);
//         if (!result) {
      
//             throw HttpError(404)
//         }
//         res.json(result)
    
// };

// const add = async (req, res) => {
    
        
//         const result = await contactsOperations.addContact(req.body)
//         res.status(201).json(result)
    
// };

// const deleteById = async (req, res) => {
    
//         const id = req.params.contactId;
//         const deletedContact = await contactsOperations.removeContact(id);
//         if (!deletedContact) {
//             throw HttpError(404);
//         }
//         res.status(200).json({
//             message: 'Contact deleted',
//         });
    
// };

// const chengeById = async (req, res) => {
 
//     const id = req.params.contactId;
//     const body = req.body;
//     const result = await contactsOperations.updateContact(id, body);
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json(result);
  
// }

module.exports = {
    getAll :ctrlWrapper(getAll),
    // getById :ctrlWrapper(getById),
    // add :ctrlWrapper(add),
    // deleteById :ctrlWrapper(deleteById),
    // chengeById :ctrlWrapper(chengeById),
}