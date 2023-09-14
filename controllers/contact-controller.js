import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import Contact from "../models/Contact.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById({ _id: contactId });

  if (!result)
    throw HttpError(404, `Contact with id: '${contactId}' not found.`);

  res.json(result);
};

const add = async (req, res) => {
  const { body } = req;
  const result = await Contact.create(body);

  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findOneAndRemove({ _id: contactId });
  if (!result)
    throw HttpError(404, `Contact with id: '${contactId}' not found.`);

  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const result = await Contact.findOneAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await Contact.findOneAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
