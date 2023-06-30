const { errorHandler } = require("../heplers");
const Contact = require("../schemas/contact");

const get = async (req, res, next) => {
  const result = await Contact.find();
  if (!result) {
    throw errorHandler(404);
  }
  res.json(result);
};

const getByID = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  console.log(result);
  if (!result) {
    throw errorHandler(404);
  }
  res.json(result);
};

const createNewContact = async (req, res, next) => {
  const body = req.body;
  await Contact.create(body);
  res.status(201).json(body);
};

const updateContact = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  console.log(body);
  if (!body) {
    throw errorHandler(400);
  }
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw errorHandler(404);
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!body || !body.favorite) {
    throw errorHandler(400);
  } else if (!result) {
    throw errorHandler(404);
  }
  
  res.json(result);
};



module.exports = {
  get,
  getByID,
  updateContact,
  deleteContact,
  createNewContact,
  updateStatusContact,
};
