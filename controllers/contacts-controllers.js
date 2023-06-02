// const { Contact, schemas } = require("../models/contact");
// const { HttpError } = require("../helpers");
// const { ctrlWrapper } = require("../decorators");

// const getAllContacts = async (req, res) => {
//     const result = await Contact.find();

//     res.status(200).json(result);
// };

// const getContactById = async (req, res) => {
//     const { id } = req.params;
//     const result = await Contact.findById(id);
//     if (!result) {
//         throw HttpError(404, "Not found");
//     }

//     res.status(200).json(result);

// };

// const addContact = async (req, res) => {
//     const { error } = schemas.addSchema.validate(req.body);
//     if (error) {
//         throw HttpError(400, "missing required field");
//     }
//     const result = await Contact.create({...req.body});

//     res.status(201).json(result);
// };

// const removeContactById = async (req, res) => {
//     const { id } = req.params;
//     const result = await Contact.findByIdAndRemove(id);

//     if (!result) {
//         throw HttpError(404, "Not found");
//     }

//     res.status(200).json({ "message": "contact deleted" });
// };

// const updateContactById = async (req, res) => {
//     const { error } = schemas.addSchema.validate(req.body);
//     if (error) {
//         throw HttpError(400, "missing fields");
//     }
//     const { id } = req.params;
//     const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
//     if (!result) {
//         throw HttpError(404, "Not found");
//     }

//     res.json(result);
// };

// const updateFavorite = async (req, res) => {
//     const { error } = schemas.updateFavoriteSchema.validate(req.body);
//     if (error) {
//         throw HttpError(400, "missing field favorite");
//     }
//     const { id } = req.params;
//     const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
//     if (!result) {
//         throw HttpError(404, "Not found");
//     }

//     res.json(result);
// };

// module.exports = {
//     getAllContacts: ctrlWrapper(getAllContacts),
//     getContactById: ctrlWrapper(getContactById),
//     addContact: ctrlWrapper(addContact),
//     removeContactById: ctrlWrapper(removeContactById),
//     updateContactById: ctrlWrapper(updateContactById),
//     updateFavorite: ctrlWrapper(updateFavorite),
// }