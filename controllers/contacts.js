const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts")

const { HttpError, ctrlWrapper } = require("../helpers");


const getAll =  async(req, res, next) => {
    const result = await listContacts();
    res.status(200).json(result);
}


const getById = async (req, res, next) => {
    const {contactId} = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};


const add = async (req, res, next) => {
    const result = await addContact(req.body);
    if (!result) {
      return res.status(400).json({ message: "alredy in contact" });
    }
    res.status(201).json(result);
};


const dellete = async (req, res, next) => {
   const result = await removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(400, "Not found");
    }
    res.status(200).json({ message: "contact deleted" })
}


const updateById = async (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(400, "Not found");
    }
    console.log(result);
    res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  dellete: ctrlWrapper(dellete),
  updateById: ctrlWrapper(updateById),
};
