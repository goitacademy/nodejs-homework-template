import * as contactServises from '../models/contacts.js';

const getAll = async (req, res, next) => {
  const result = res.json(await contactServises.listContacts(req, res, next));

  return result;
};

const getById = async (req, res, next) => {
  const result = res.json(await contactServises.getContactById(req, res, next));
  return result;
};

export const deleteById = async (req, res, next) => {
  res.json(await contactServises.removeContact(req, res, next));
};

export const add = async (req, res, next) => {
  res.json(await contactServises.addContact(req, res, next));
};
export const put = async (req, res, next) => {
  res.json(await contactServises.updateContact(req, res, next));
};

export default { getAll, getById, deleteById, add, put };
