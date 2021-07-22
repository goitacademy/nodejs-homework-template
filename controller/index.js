const service = require('../service/schemas');
const getContacts = async (req, res, next) => {
  try {
    const results = await service.getAllContact();
    res.json({
      status: 'success',
      code: 200,
      data: {
        tasks: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getContactsById(id);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.removeContact(id);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await service.createContact({ name, email, phone })

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { task: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const result = await service.updateContact(id, { name, email, phone });
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite = false } = req.body;

  try {
    const result = await service.updateContact(id, { favorite });
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getContacts,
  getById,
  deleteContact,
  create,
  update,
  updateStatus,
};
