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

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactServise.getAll();
    res.status(HttpCode.OK).json(getSuccesObject(contacts, HttpCode.OK));
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await contactServise.getById(req.params);
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
    const contact = await contactServise.create(req.body);
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
    const contact = await contactServise.remove(req.params);
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
    const contact = await contactServise.update(req.params, req.body);
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
    const contact = await contactServise.update(req.params, req.body);
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
