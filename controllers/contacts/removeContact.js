// @ DELETE /api/contacts/:id

const { basedir } = global;

const service = require(`${basedir}/services`);

const { createError } = require(`${basedir}/help`);

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await service.remove(id);

  if (!result) {
    throw createError(404);
  }
  return res.json({
    status: "Success",
    code: 200,
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeContact;
