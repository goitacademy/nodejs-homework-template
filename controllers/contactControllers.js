const {
  addSchema,
  favoriteSchema,
} = require("../validation/contactValidationSchemas");
const { HttpError } = require("../helpers/httpError");
const Contact = require("../models/contact");

const getAllContact = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const query = { owner: req.user.id };

    if (favorite === "true") {
      query.favorite = true;
    }

    const result = await Contact.find(query, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const result = await Contact.findById(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const newContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw HttpError(404, error.message);
    } else {
      const body = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favorite: req.body.favorite,
        owner: req.user.id,
      };
      const result = await Contact.create(body);

      res.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw HttpError(404, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      HttpError(400, "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllContact,
  getOneContact,
  newContact,
  deleteContact,
  updateContact,
  updateFavorite,
};
