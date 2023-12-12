import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Contact from "../models/Contact.js";

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.json(result);
};

const getByID = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, "Contact does not found");
  }
  res.json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(400, `Not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, "Contact does not found");
  }
  res.json({ message: "Contact is deleted" });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getByID: ctrlWrapper(getByID),
  addNewContact: ctrlWrapper(addNewContact),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
