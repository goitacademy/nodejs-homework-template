import { HttpError } from "../helpers/HttpError.js";
import { controllerWrapper } from "../decorators/index.js";
import { Contact } from "../models/Contact.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  let options = { owner}
  if (req.query.favorite) {
    options = { owner, favorite: true}
  }
   const r = await Contact.find(options, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
  res.json(r);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const r = await Contact.findOne({ _id: contactId, owner });
  if (!r) {
    throw HttpError(404);
  }
  res.json(r);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const r = await Contact.create({ ...req.body, owner });
  res.status(201).json(r);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const r = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body);
  if (!r) {
    throw HttpError(404);
  }
  res.json(r);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const r = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body);
  if (!r) {
    throw HttpError(404);
  }
  res.json(r);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const r = await Contact.findOneAndRemove({ _id: contactId, owner });
  if (!r) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};
export default {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  updateById: controllerWrapper(updateById),
  updateStatusContact: controllerWrapper(updateStatusContact),
  deleteById: controllerWrapper(deleteById),
};
