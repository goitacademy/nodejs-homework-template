const createError = require("http-errors");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../servise/contacts");

const {
  validationPost,
  validationPut,
  validationPatch,
} = require("../servise/validation");

const get = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      code: 200,
      data: await listContacts(),
    });
  } catch (error) {
    next();
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (data) {
      res.json({ status: "success", code: 200, data });
    } else {
      createError(404);
      next();
    }
  } catch (error) {
    next();
  }
};

const create = async (req, res, next) => {
  try {
    await validationPost.validateAsync(req.body);
    const data = await addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data });
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({ message: "missing required field" });
    } else {
      next(error);
    }
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isSuccess = await removeContact(contactId);
    if (isSuccess) {
      res.json({ status: "success", code: 200, message: "contact deleted" });
    } else {
      createError(404);
      next();
    }
  } catch (error) {
    next();
  }
};

const update = async (req, res, next) => {
  try {
    await validationPut.validateAsync(req.body);
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    res.json({ status: "success", code: 200, data: updatedContact });
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({ message: "missing fields" });
    } else if (error.kind === "ObjectId") {
      createError(404);
      next();
    } else {
      next(error);
    }
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    await validationPatch.validateAsync(req.body);
    const { contactId } = req.params;
    const updatedContact = await updateStatusContact(contactId, req.body);
    res.json({ status: "success", code: 200, data: updatedContact });
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({ message: "missing field favorite" });
    } else if (error.kind === "ObjectId") {
      createError(404);
      next();
    } else {
      next(error);
    }
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  updateFavorite,
};
