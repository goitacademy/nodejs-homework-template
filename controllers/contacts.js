// const { Contact } = require('../models/contact');

// const { HttpError, ctrlWrapper } = require('../helpers');

// const listContacts = async (req, res) => {
//     const result = await Contact.find({}, '-createdAt -updatedAt');
//     res.json(result);
// };

// const getContactById = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await Contact.findById(contactId);
//     if (!result) {
//         throw HttpError(404, 'Not found');
//     }
//     res.json(result);
// };

// const addContact = async (req, res) => {
//     const result = await Contact.create(req.body);
//     res.status(201).json(result);
// };

// const removeContact = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await Contact.findByIdAndRemove(contactId);
//     if (!result) {
//         throw HttpError(404, 'Not found');
//     }
//     res.json({
//         message: 'Delete sucsses',
//     });
// };

// const updateContact = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
//     if (!result) {
//         throw HttpError(404, 'Not found');
//     }
//     res.json(result);
// };
// const updateStatusContact = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
//     if (!result) {
//         throw HttpError(404, 'Not found');
//     }
//     res.json(result);
// };

// module.exports = {
//     listContacts: ctrlWrapper(listContacts),
//     getContactById: ctrlWrapper(getContactById),
//     addContact: ctrlWrapper(addContact),
//     removeContact: ctrlWrapper(removeContact),
//     updateContact: ctrlWrapper(updateContact),
//     updateStatusContact: ctrlWrapper(updateStatusContact),
// };
