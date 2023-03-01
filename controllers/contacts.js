const { Contact } = require("../models");

const { HttpError, ctrlWrapper } = require("../middlewares");

const {
  contactPostValidator,
  contactPutValidator,
  favoriteJoiSchema,
} = require("../schemasJoi");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite, name, phone } = req.query;
  const skip = (page - 1) * limit;

  // якщо реалізовувати тільки фільтр улюблених контактів, то
  // const searchParams = req.query.favorite
  //   ? { owner: _id, favorite: true }
  //   : { owner: _id };

  const searchParams = { owner: _id };

  if (favorite) {
    searchParams.favorite = favorite;
  }

  if (name) {
    searchParams.name = name;
  }

  if (phone) {
    searchParams.phone = phone;
  }

  const result = await Contact.find(searchParams)
    .skip(skip)
    .limit(Number(limit))
    .sort("name")
    .populate("owner", "_id email subscription");
  return res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res, next) => {
  const { error } = contactPostValidator(req.body);
  if (error)
    return res.status(400).json({ message: "missing required name field" });
  const { _id } = req.user;
  const { name, email, phone, favorite } = req.body;
  const contact = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });
  if (contact) return res.status(201).json(contact);
};

const updateContact = async (req, res, next) => {
  const { error } = contactPutValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
  }
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await Contact.findByIdAndRemove(contactId);
  if (!contactToRemove) {
    res.status(404).json({ message: "Not found contact" });
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = favoriteJoiSchema(req.body);

  if (error) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    return res.status(404).json({ message: "Not found contact" });
  }
  return res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getById: ctrlWrapper(getById),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
