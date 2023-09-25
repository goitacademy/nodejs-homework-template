const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);

    if (error) {
      throw createError(404, "missing required name");
    }

    const result = await Contact.create(req.body);
    res.status(201).send(result);

  } catch (error) {
    next(error);
  }
};

module.exports = addContact;