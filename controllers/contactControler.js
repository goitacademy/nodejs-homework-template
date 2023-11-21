import { HttpError } from "../helpers/index.js";
import ctrWrapper from "../decorators/ctrlWrapper.js";
import Contact from "../models/Contact.js";

export const getList = async (req, res) => {
  const data = await Contact.find();
  res.json(data);
};

export const getContactId = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404);
  }
  res.json(data);
};

export const postAddContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndDelete(id);

  if (!data) {
    throw HttpError(404);
  }

  res.status(200).json({ message: "contact deleted" });
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
};

export default {
  getList: ctrWrapper(getList),
  getContactId: ctrWrapper(getContactId),
  postAddContact: ctrWrapper(postAddContact),
  deleteContact: ctrWrapper(deleteContact),
  updateContact: ctrWrapper(updateContact),
};
