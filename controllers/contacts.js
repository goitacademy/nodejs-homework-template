const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contacts");

const getAll = async (req, res, next) => {
   const result = await Contact.find();

   res.status(200).json(result);
};

const getContactById = async (req, res) => {
   const { contactId } = req.params;
   const result = await Contact.findById(contactId);

   if (!result) {
      throw HttpError(404, "Not found");
   }
   res.json(result);
};

const addContact = async (req, res) => {
   const result = await Contact.create(req.body);
   res.status(201).json(result);
};

const removeContact = async (req, res) => {
   const { contactId } = req.params;
   const result = await Contact.findByIdAndRemove(contactId);
   if (!result) {
      throw HttpError(404, "Not found");
   }
   res.json({
      message: "Delete success",
   });
};

const updateContact = async (req, res) => {
   const { contactId } = req.params;
   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
   });
   if (!result) {
      throw HttpError(404, "Not found");
   }
   res.json(result);
};

const updateStatusContact = async (req, res) => {
   const { contactId } = req.params;
   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
   });
   if (!result) {
      throw HttpError(404, "Not found");
   }
   res.json(result);
};

module.exports = {
   getAll: ctrlWrapper(getAll),
   getContactById: ctrlWrapper(getContactById),
   addContact: ctrlWrapper(addContact),
   removeContact: ctrlWrapper(removeContact),
   updateContact: ctrlWrapper(updateContact),
   updateStatusContact: ctrlWrapper(updateStatusContact),
};
