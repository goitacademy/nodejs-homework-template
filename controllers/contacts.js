const Contacts = require('../model/contacts');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.listContacts(userId, req.query);

    return res.json({
      status: 'success',
      code: 200,
      data: { ...contacts },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(req.params.id, userId);

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });

    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(req.params.id, userId);

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      req.params.id,
      req.body,
      userId,
    );

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.json({
        status: 'error',
        code: 400,
        message: 'missing fields',
      });
    }

    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      req.params.id,
      req.body,
      userId,
    );

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
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
  updateStatus,
};
