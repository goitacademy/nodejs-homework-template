import {ctrlWrapper} from "../decorators/index.js";
import {HttpError} from "../helpers/index.js";
import Contact from "../models/contact.js";

export const listContacts = async (req, res) => {
  const {_id: owner} =req.user;
  const {page =1, limit = 10} =req.query;
  const skip =(page - 1) * limit;
  const result = await Contact.find({owner}, "-createdAT - updateAt", {skip:2, limit:2}).populate("owner", "name email");
  res.status(200).json(result);
  console.log("результат", result)
};

export const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export const addContact = async (req, res) => {
  const {_id: owner} =req.user
  const result = await Contact.create(...req.body, owner);
  res.status(201).json(result);
  
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw HttpError( 404, `Movie with id=${contactId} not found`);
  }
  res.status(200).json(result);
};

export const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
export const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};


export default {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
