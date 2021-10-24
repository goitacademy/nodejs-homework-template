const Contacts = require("../repository");
const { HttpCode } = require("../config/constans");
const { CustomError } = require("../helpers/customError");

const getContacts = async (req, res) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { ...data },
  });
};

const getContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }

  throw new CustomError(404, "Not Found!");
};

const updateContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }

  throw new CustomError(404, "Not Found!");
};

const createContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { contact } });
};

const removeContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }

  throw new CustomError(404, "Not Found!");
};

const updateStatusContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }

  throw new CustomError(404, "Not Found!");
};

const onlySubBusiness = async (req, res, next) => {
  return res.json({
    status: "success",
    code: 200,
    data: {
      message: "Only for Subscription: Business",
    },
  });
};

const onlySubPro = async (req, res, next) => {
  return res.json({
    status: "success",
    code: 200,
    data: {
      message: "Only for Subscription: Pro",
    },
  });
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
  onlySubBusiness,
  onlySubPro,
};
