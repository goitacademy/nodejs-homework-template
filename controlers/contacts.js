const contacts = require("../controlers/contacts.json");
const { RequestError } = require("../helpers/RequestError");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getById(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contacts.add(req.body);
  res.status(201).json(result);
};

const remuveById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.remuveById(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll,
  getById,
  add,
  remuveById,
};
