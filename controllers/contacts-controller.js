import Contact from "../models/contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const updateStatusContact = (id, body) =>
  Contact.findByIdAndUpdate(id, {
    favorite: body,
  });

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, `Movie with id: '${id}' not found`);
  }
  res.json(contact);
};

const add = async (req, res) => {
  const addContact = await Contact.create(req.body);
  res.status(201).json(addContact);
};

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndUpdate(id, req.body);
  if (!contact) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(contact);
};

const favorite = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body.favorite;
  if (body === undefined) {
    throw HttpError(400, "missing field favorite");
  }
  await updateStatusContact(id, body);
  res.status(200).json({
    message: `favorite: ${body} `,
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  favorite: ctrlWrapper(favorite),
};
