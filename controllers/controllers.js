const Contacts = require('../model');

const getPosts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getPostsDyId = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Contact not found' });
  } catch (error) {
    next(error);
  }
};

const addPosts = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'error', code: 400, message: error.message });
  }
};

const deletePosts = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: `Contact with <${req.params.contactId}> deleted`,
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Contact not found' });
  } catch (error) {
    next(error);
  }
};

const changePosts = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    );

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Contact not found' });
  } catch (error) {
    next(error);
  }
};

const patchPosts = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    );

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Contact not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostsDyId,
  addPosts,
  deletePosts,
  changePosts,
  patchPosts,
};
