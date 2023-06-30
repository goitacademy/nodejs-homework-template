const { errorHandler } = require("../heplers");
const Contact = require("../schemas/contact");

const get = async (req, res, next) => {
  try {
    const result = await Contact.find();
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getByID = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await Contact.findById(id);
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const createNewContact = async (req, res, next) => {
  try {
    const body = req.body;
    await Contact.create(body);
    res.status(201).json(body);
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    console.log(body);
    if (!body) {
      throw errorHandler(400);
    }
    const result = await Contact.findByIdAndUpdate(id, body, { new: true });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
  getByID,
  updateContact,
  deleteContact,
  createNewContact,
};
