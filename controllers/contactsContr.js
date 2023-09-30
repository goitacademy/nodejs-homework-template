const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  // пагінація
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const { favorite } = req.query; 
  const filter = { owner };
  // якщо в запиті є параметр favorite, фільтруємо обрані (favorite = true)
   if (favorite === "true" || favorite === "false") {
    filter.favorite = favorite === "true";
  }
 try {
    const result = await Contact.find(filter, "-createdAt -updatedAt", { skip, limit }).populate('owner', 'name email');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }

};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

// @ PATCH / api / contacts /: contactId / favorite
const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};



module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
