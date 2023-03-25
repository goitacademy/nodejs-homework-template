const { Contact } = require("../models/contactModel");
const { HttpError } = require("../helpers/httpError");

const getAllContacts = async (owner, { skip, limit, isFavorite }) => {
  return await Contact.find({ owner })
    .skip(skip)
    .limit(+limit)
    .where(isFavorite);
};

const getContactById = async (id, owner) => {
  return await Contact.findOne({ _id: id, owner });
};

const createContact = async ({ name, email, phone, favorite }, owner) => {
  const foundContactName = await Contact.findOne({ name, owner });
  const foundContactEmail = await Contact.findOne({ email, owner });
  const foundContactPhone = await Contact.findOne({ phone, owner });

  if (foundContactName)
    throw new HttpError(
      409,
      `Name contact: "${foundContactName}" is already in use.`
    );
  if (foundContactEmail)
    throw new HttpError(
      409,
      `Email contact: "${foundContactEmail}" is already in use.`
    );
  if (foundContactPhone)
    throw new HttpError(
      409,
      `Phone contact: "${foundContactPhone}" is already in use.`
    );

  return await Contact.create({ name, email, phone, favorite, owner });
};

const updateContact = async (id, body, owner) => {
  return await Contact.findOneAndUpdate({ _id: id, owner }, body, {
    new: true,
  });
};

const removeContact = async (id, owner) => {
  return await Contact.findOneAndRemove({ _id: id, owner });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
