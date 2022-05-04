const contactsRepository = require("../../repository/contacts");
const { HTTP_STATUS_CODE } = require("../../libs/constants");

const getList = async (req, res, next) => {
  const contacts = await contactsRepository.listContacts();
  res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    payload: { contacts },
  });
};

const getById = async (req, res, next) => {
  const contact = await contactsRepository.getContactById(req.params.contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: HTTP_STATUS_CODE.OK,
      payload: { contact },
    });
  }
  return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    status: "error",
    code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    message: "Not Found",
  });
};

const add = async (req, res, next) => {
  const contact = await contactsRepository.addContact(req.body);
  res.status(HTTP_STATUS_CODE.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODE.CREATED,
    payload: { contact },
  });
};

const remove = async (req, res, next) => {
  const contact = await contactsRepository.removeContact(req.params.contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: HTTP_STATUS_CODE.OK,
      message: "Contact deleted",
      payload: { contact },
    });
  }
  return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    status: "error",
    code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    message: "Not Found",
  });
};

const update = async (req, res, next) => {
  const contact = await contactsRepository.updateContact(
    req.params.contactId,
    req.body
  );
  if (contact) {
    return res.json({
      status: "success",
      code: HTTP_STATUS_CODE.OK,
      payload: { contact },
    });
  }
  return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    status: "error",
    code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    message: "Not Found",
  });
};

module.exports = {
  getList,
  getById,
  add,
  remove,
  update,
};

export {};
