
import contactsData from "../models/contacts.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const getAll = async (req, res) => {
  const result = await contactsData.listContacts();
  res.json(result);
}

const getById = async (req, res) => {
  const result = await contactsData.getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
}

const add = async(req, res) => {
  // const {error} = contactAddSchema.validate(req.body);
  // if(error) {
  //   throw HttpError(400, error.message);
  // }
  const result = await contactsData.addContact(req.body);
  res.status(201).json(result);
}

const updateById = async (req, res) => {
  // const { error } = contactAddSchema.validate(req.body);
  // if (error) { 
  //   throw HttpError(400, error.message);
  // }
  const result = await contactsData.updateContact(req.params.contactId, req.body);
  if (!result) { 
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json(result);
}

const deleteById = async (req, res) => {
  const result = await contactsData.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=$(id) not found`);
  }
  res.json({
    message: "Delete success"
  })
}

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};