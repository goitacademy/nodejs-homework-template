// @ PUT /api/contacts/:id

const { basedir } = global;

const service = require(`${basedir}/services`);

const { schemas } = require(`${basedir}/models/contact`);

const { createError } = require(`${basedir}/help`);

const updateContact = async (req, res) => {
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(404, "Missing fields");
  }

  const { id } = req.params;
  const result = await service.update(id, req.body);

  if (!result) {
    throw createError(404);
  }

  return res.json({
    status: "Success",
    code: 200,
    message: "Contacts updated",
    data: {
      result,
    },
  });
};

module.exports = updateContact;
