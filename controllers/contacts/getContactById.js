// @ GET /api/contacts/:id

const { basedir } = global;

const service = require(`${basedir}/services`);

const { createError } = require(`${basedir}/help`);

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getById(id);

  if (!result) {
    throw createError(404);
  }
  return res.json({
    status: "Success",
    code: 200,
    message: "Contact found",
    data: {
      result,
    },
  });
};

module.exports = getContactById;
