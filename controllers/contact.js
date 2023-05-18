const { Contact } = require("../models/contact");

const { HttpError } = require("../heplers");

const { schemas } = require("../models/contact");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findById(contactId);
    if (!result) throw HttpError(404, "Not Found");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true, //поверне оновлений об.єкт
    });

    if (!data) throw HttpError(400, "missing fields");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact  = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const data = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true, //поверне оновлений об.єкт
      });
  
      if (!data) throw HttpError(400, "missing fields favorite");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateStatusContact,
};
