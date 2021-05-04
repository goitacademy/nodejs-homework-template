const Contacts = require('../model/contacts');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contacts = await Contacts.listContacts(userId, req.query);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const contact = await Contacts.addContact(userId, req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    console.log(userId);

    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body,
    );

    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const contact = await Contacts.updateStatusContact(
      userId,
      req.params.contactId,
      req.body,
    );

    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const onlySTARTER = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'only Starter',
    },
  });
};

const onlyPRO = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Only Pro',
    },
  });
};

const onlyBUSINESS = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Only Business',
    },
  });
};

module.exports = {
  getAll,
  getById,
  createContact,
  update,
  updateStatus,
  remove,
  onlySTARTER,
  onlyPRO,
  onlyBUSINESS,
};
