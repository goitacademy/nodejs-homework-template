const contactsService = require('../services/contactsService');
const JoiSchema = require('../schemas/contactsSchema');

const get = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;
    const filters = { owner: _id, favorite };
    const contacts = await contactsService.listContacts({
      filters,
      skip,
      limit,
    });
    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { _id } = await req.user;
    const { id } = await req.params;
    const contact = await contactsService.getContactById({
      userId: _id,
      contactId: id,
    });
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
      return;
    }
    res.status(404).json({
      status: 'Not found',
      code: 404,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { _id } = await req.user;
    let { name, email, phone, favorite } = await req.body;
    if (!favorite) {
      favorite = false;
    }
    const isValid = JoiSchema.allRequired.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (isValid.error) {
      res.status(400).json({
        message: isValid.error.details[0].message,
        code: 400,
      });
      return;
    }
    const contact = await contactsService.addContact({
      name,
      email,
      phone,
      favorite,
      owner: _id,
    });
    res.json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const isDelete = await contactsService.removeContact({
      userId: _id,
      contactId: id,
    });
    if (isDelete) {
      res.json({
        status: 'contact deleted',
        code: 200,
      });
    } else {
      res.status(404).json({
        message: 'Not found',
        code: 404,
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const isValid = JoiSchema.atLeastOne.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (isValid.error) {
      res.status(400).json({
        message: isValid.error.details[0].message,
        code: 400,
      });
      return;
    }
    const newContact = JSON.parse(JSON.stringify(isValid.value));
    const contact = await contactsService.updateContact({
      userId: _id,
      contactId: id,
      body: newContact,
    });
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
      return;
    }
    res.status(404).json({
      message: 'Not found',
      code: 404,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { favorite } = req.body;
    const isValid = JoiSchema.atLeastOne.validate({
      favorite,
    });
    if (isValid.error) {
      res.status(400).json({
        message: isValid.error.details[0].message,
        code: 400,
      });
      return;
    }
    const contact = await contactsService.updateStatusContact({
      userId: _id,
      contactId: id,
      body: JSON.parse(JSON.stringify(isValid.value)),
    });
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
      return;
    }
    res.status(404).json({
      message: 'Not found',
      code: 404,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  get,
  getById,
  create,
  removeById,
  update,
  updateStatus,
};
