const { basedir } = global;

const { Contact, schemas } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const addContact = async (req, res) => {
  const { error } = schemas.contactAdd.validate(req.body);
  if (error) {
    throw createError(400, "missing required name field");
  }
  const { id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
