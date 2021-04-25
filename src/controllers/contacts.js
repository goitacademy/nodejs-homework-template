const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../service");
const { getSuccesObject, getErrorObject } = require("./controllersFunction");
const contactServise = new ContactsService();

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactServise.getAll(userId, req.query);
    res.status(HttpCode.OK).json(getSuccesObject({ ...contacts }, HttpCode.OK));
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactServise.getById(userId, req.params);
    if (contact) {
      res.status(HttpCode.OK).json(getSuccesObject(contact, HttpCode.OK));
    } else {
      return next(getErrorObject());
    }
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactServise.create(userId, req.body);
    res
      .status(HttpCode.CREATED)
      .json(getSuccesObject(contact, HttpCode.CREATED));
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactServise.remove(userId, req.params);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "succes",
        code: HttpCode.OK,
        message: "contact deleted",
      });
    } else {
      return next(getErrorObject());
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactServise.update(userId, req.params, req.body);
    if (contact) {
      res.status(HttpCode.OK).json(getSuccesObject(contact));
    } else {
      return next(getErrorObject());
    }
  } catch (e) {
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactServise.update(userId, req.params, req.body);
    if (contact) {
      res.status(HttpCode.OK).json(getSuccesObject(contact));
    } else {
      return next(getErrorObject());
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  updateStatusContact,
};
