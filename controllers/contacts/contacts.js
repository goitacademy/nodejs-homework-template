const { Contact } = require("../../models/contact");
const { WrongParametersError, NotFoundError } = require("../../helpers");

// const { services: srv } = require("../../service");

const getAll = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({ contacts });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    throw new NotFoundError(`Contact with id=${id} not found`);
  }
  res.json(contactById);
};

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw new NotFoundError(`Contact with id=${req.id} not found`);
  }
  res.json(updatedContact);
};

const updateStatusById = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    throw new WrongParametersError("missing field favorite");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw new NotFoundError(`Contact with id=${req.id} not found`);
  }
  res.json(updatedContact);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndRemove(id);
  if (!removedContact) {
    throw new NotFoundError(`Contact with id=${req.id} not found`);
  }
  res.json(removedContact);
};

module.exports = {
  add,
  updateById,
  updateStatusById,
  getAll,
  getById,
  removeById,
};
