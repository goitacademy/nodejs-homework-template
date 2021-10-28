const Contacts = require('../repository/contacts');
const { CustomError } = require('../helpers/customError');
const { HttpCode } = require('../config/constants');

const getPosts = async (req, res) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res.json({
    status: 'success',
    code: HttpCode.OK,
    data: { ...data },
  });
};

const getPostsDyId = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact },
    });
  }

  throw new CustomError(HttpCode.NO_CONTENT, 'Not Found');
};

const addPosts = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    data: { contact },
  });
};

const deletePosts = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      message: `Contact with <${req.params.contactId}> deleted`,
    });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Not Found');
};

const changePosts = async (req, res) => {
  const userId = req.user.id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId,
  );

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact },
    });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Contact not found');
};

const patchPosts = async (req, res) => {
  const userId = req.user.id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId,
  );

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact },
    });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Contact not found');
};

module.exports = {
  getPosts,
  getPostsDyId,
  addPosts,
  deletePosts,
  changePosts,
  patchPosts,
};
