import Contact from "../models/contact.js";

import HttpError from "../helpers/HttpError.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner, ...query },
    "-createAt -updateAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");
  res.json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw HttpError(404, `Contact with id=${contactId} is not found`);
  }
  res.json(contactById);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) {
    throw HttpError(404, `Contact with id=${contactId} is not found`);
  }
  res.json(updateContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) {
    throw HttpError(404, `Contact with id=${contactId} is not found`);
  }
  res.json(updateContact);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const deleteContactById = await Contact.findByIdAndDelete(contactId);
  console.log(`this is id for remove ${{ ...deleteContactById }}`);
  if (!deleteContactById) {
    throw HttpError(404, `Contact with id=${contactId} is not found`);
  }
  res.json(deleteContactById);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeById: ctrlWrapper(removeById),
};
