import Contact from "../models/contact.js";
import { ctrlWrapper } from "../decorators/index.js";
import { checkContactAndAccess } from "../utils/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  const favorite = req.query.favorite;

  if (favorite) {
    filter.favorite = favorite ? favorite === "true" : "false";
  }

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user._id;
  const contact = await Contact.findById(id);

  checkContactAndAccess(contact, currentUserId);

  res.json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user._id;
  const contact = await Contact.findById(id);

  checkContactAndAccess(contact, currentUserId);

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user._id;
  const contact = await Contact.findById(id);

  checkContactAndAccess(contact, currentUserId);

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user._id;
  const contact = await Contact.findById(id);

  checkContactAndAccess(contact, currentUserId);

  await contact.deleteOne();

  res.json({
    message: "Delete success",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
