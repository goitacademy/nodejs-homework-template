const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");


const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(`${contactId}`);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json({
          message: "contact deleted",
        });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
 const { id } = req.params;
 const { favorite } = req.body;

 if (favorite === undefined) {
  throw HttpError(400, "missing fields");}

  const result = await contacts.findByIdAndUpdate(
   id,{ favorite },{ new: true });

  if (!result) {
   throw HttpError(404, "Not found");
  }
   res.status(200).json(result);
 };

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};