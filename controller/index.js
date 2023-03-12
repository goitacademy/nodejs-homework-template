const RequestError = require("../errors/helpers/requestErors");
const { Contact } = require("../models/contact");

const get = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await Contact.create({ name, email, phone });
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      // добавляємо,щоб в відповіді сервера приходили данні оновленого об'єкту  -new: true,
      new: true,
    });
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    // if (!req.body) {
    //   res.status(400).json({message: 'missing field favorite'});
    // }
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "Delete success" });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatusContact,
};
