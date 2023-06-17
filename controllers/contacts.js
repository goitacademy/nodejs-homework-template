

const { Contact } = require('../models/contact');
const { ctrlWrapper } = require('../helpers');


const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

// const getById = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await getContactById(contactId);
//     if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
//     res.json(result)
// };

// const add = async (req, res) => {
//     const result = await addContact(req.body);
//     res.status(201).json(result);
// };

// const update = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await updateContact(contactId, req.body);
//     if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
//     res.json(result);
// }

// const remove = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await removeContact(contactId);
//     if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
//     res.json({
//         message: "Contact deleted",
//         result
//     })
// };


module.exports = {
    getAll: ctrlWrapper(getAll),
    // getById: ctrlWrapper(getById),
    // add: ctrlWrapper(add),
    // remove: ctrlWrapper(remove),
    // update: ctrlWrapper(update)
}