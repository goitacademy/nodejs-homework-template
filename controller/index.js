const service = require('../service');

const get = async (req, res, next) => {
  try {
    const results =
      await service.getAllContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        Contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(
      contactId
    );
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { Contact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found Contact id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await service.createContact({
      name,
      email,
      phone
    });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { Contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  console.log(contactId);
  try {
    const result = await service.updateContact(
      contactId,
      { name, email, phone, updateAt: new Date() }
    );
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { Contact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found Contact id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;

  try {
    const result = await service.updateContact(
      contactId,
      { favorite , updateAt: new Date()}
    );
    console.log(result);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { Contact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found Contact id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.removeContact(
      contactId
    );
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { Contact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found Contact id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
