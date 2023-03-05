const { Contact } = require("../models");

const { HttpErorr, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  console.log("3333");
  console.log("favorite.req.query", req.query.favorite);
 
  if (req.query.favorite) {
    console.log("444");
    const contacts = await Contact.find(
      { owner, favorite: req.query.favorite });
    res.json({ contacts, status: "200" });
  }

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json({ contacts, status: "200" });
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const contact = await Contact.find({ _id: contactId, owner: owner });

  if (contact.length === 0) {
    throw HttpErorr(404, "Not found");
  }
  res.json({ contact, status: "200" });
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContacts = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContacts);
};

const updateById = async (req, res, next) => {
  const updateContacts = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!updateContacts) {
    res.json({ message: "Not found", status: "404" });
  }
  res.json({ updateContacts, status: "200" });
};

const updateFavorite = async (req, res, next) => {
  const updateContacts = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true },
  
  );
  if (!updateContacts) {
    throw HttpErorr(404, "Not found");
  }
  res.json({ updateContacts, status: "200" });
};

const deleteById = async (req, res, next) => {
  const contactDelete = await Contact.findByIdAndRemove(req.params.contactId);
  if (!contactDelete) {
    throw HttpErorr(404, "found");
  } else {
    res.json({ message: "contact deleted", status: "200" });
  }
};


module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
