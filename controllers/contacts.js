const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../service");
const contactServise = new ContactsService();

function getSuccesObject(data, code) {
  return {
    status: "succes",
    code,
    data,
  };
}

function getErrorObject() {
  return {
    status: HttpCode.NOT_FOUND,
    message: "Not found",
    data: "Not Found",
  };
}

const getAll = (req, res, next) => {
  try {
    console.log("contr", contactServise);

    const contacts = contactServise.getAll();
    res.status(HttpCode.OK).json(getSuccesObject(contacts, HttpCode.OK));
  } catch (e) {
    next(e);
  }
};

const getById = (req, res, next) => {
  try {
    const contact = contactServise.getById(req.params);
    if (contact) {
      res.status(HttpCode.OK).json(getSuccesObject(contact, HttpCode.OK));
    } else {
      return next(getErrorObject());
    }
  } catch (e) {
    next(e);
  }
};

const create = (req, res, next) => {
  try {
    console.log("serv", req.body);
    const contact = contactServise.create(req.body);
    res
      .status(HttpCode.CREATED)
      .json(getSuccesObject(contact, HttpCode.CREATED));
  } catch (e) {
    next(e);
  }
};

const remove = (req, res, next) => {
  try {
    const contact = contactServise.remove(req.params);
    if (contact) {
      //res.status(HttpCode.OK).json(getSuccesObject(contact, HttpCode.OK));
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

const update = (req, res, next) => {
  try {
    const contact = contactServise.update(req.params, req.body);
    if (contact) {
      res.status(HttpCode.OK).json(getSuccesObject(contact));
    } else {
      return next(getErrorObject());
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { getAll, getById, create, remove, update };
