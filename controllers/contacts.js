// -----------------------------------------------------
//                CONTACTS Controller
// -----------------------------------------------------
const contacts = [];
const { ctrlWrapper, HttpError } = require("../utils");
const { Contact } = require("../models/contact");

// -------------- getAll -------------------------------------
const getAll = async (req, res) => {
  const { page = 1, limit = 10, ...params } = req.query;
  const skip = (page - 1) * limit;

  let query = null;

  if (params.favorite) {
    switch (params.favorite) {
      case "true":
        query = { favorite: true };
        break;
      case "false":
        query = { favorite: false };
        break;
    }
  }

  const result = await Contact.find(query, null, { skip, limit });
  res.status(200).json({
    code: 200,
    result: result,
  });
};

// ------------ getContactById -------------------------------
const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    code: 200,
    result: contact,
  });
};

// ------------ addContact ------------------------------------
const addContact = async (req, res) => {
  const body = req.body;
  const contact = await Contact.create(body);
  res.status(201).json({ result: contact });
};

// ------------ removeContact -----------------------------------
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const removeContact = await Contact.findByIdAndRemove(contactId);
  if (!removeContact) {
    throw HttpError(404, "Not found");
  }
  res.json({ code: 200, message: "contact deleted" });
};

// ------------- updateContact ------------------------------------------------
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const putContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!putContact) {
    throw HttpError(404, "Not found");
  }
  res.json({ code: 200, result: putContact });
};

// --------------- updateStatusContact -----------------------------------------
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const patchContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!patchContact) {
    throw HttpError(404, "Not found");
  }
  res.json({ code: 200, result: patchContact });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
