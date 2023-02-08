const service = require('../service');
const Joi = require('joi');

const custom = Joi.defaults(() =>
  Joi.object({
    name: Joi.string().pattern(
      /^([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+) ([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+)$/
    ),
    email: Joi.string().email(),
    phone: Joi.string().pattern(
      /^([+][0-9]{0,4})?[\s]?([(][0-9]{1,3}[)])?[\s]?[0-9]{2,3}[-\s]?[0-9]{2,3}[-\s]?[0-9]{2,4}$/
    ),
    favorite: Joi.boolean(),
  })
);

const schema = custom.object().or('name', 'email', 'phone');
const schemaRequired = custom
  .object()
  .options({ presence: 'required' })
  .required();

const get = async (req, res, next) => {
  try {
    const contacts = await service.listContacts();
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
  const { contactId } = req.params;
  try {
    const contact = await service.getContactById(contactId);
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
  const { name, email, phone, favorite } = await req.body;
  const check = schemaRequired.validate({ name, email, phone, favorite });
  if (check.error) {
    res.status(400).json({
      message: check.error.details[0].message,
      code: 400,
    });
    return;
  }
  try {
    const contact = await service.addContact({ name, email, phone, favorite });
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
  const { contactId } = req.params;
  try {
    const isDelete = await service.removeContact(contactId);
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
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const check = schema.validate({ name, email, phone, favorite });
  if (check.error) {
    res.status(400).json({
      message: check.error.details[0].message,
      code: 400,
    });
    return;
  }
  try {
    const isExist = await service.updateContact(
      contactId,
      JSON.parse(JSON.stringify(check.value))
    );
    if (isExist) {
      res.json({
        status: 'success',
        code: 200,
        data: { ...isExist },
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
};
