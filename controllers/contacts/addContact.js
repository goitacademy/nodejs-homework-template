// @ POST /api/contacts

const { basedir } = global;

const service = require(`${basedir}/services`);

const { schemas } = require(`${basedir}/models/contact`);

const { createError } = require(`${basedir}/help`);

const addContact = async (req, res) => {
  const { error } = schemas.add.validate(req.body);

  if (error) {
    throw createError(400, "Missing required name field");
  }

  const result = await service.add(req.body);
  return res.json({
    status: "Success",
    code: 201,
    message: "Request successful. Contact created",
    data: {
      result,
    },
  });
};

module.exports = addContact;
