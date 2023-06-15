const contactsService = require('../services/contactsService');
const JoiSchema = require('../schemas/contactsSchema');

const get = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
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
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
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
    const { id } = req.params;
    const isDelete = await contactsService.removeContact(id);
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
    const contact = await contactsService.updateContact(id, newContact);
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
    const contact = await contactsService.updateStatusContact(
      id,
      JSON.parse(JSON.stringify(isValid.value))
    );
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
