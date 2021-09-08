// const createError = require("http-errors");

const { NotFound } = require("http-errors");
const { contacts: service } = require("../../services");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.getById(contactId);
  if (!result) {
    // const error = createError(404, `Contact with id = ${contactId} not found`);
    // throw error;
    throw new NotFound(`Contact with id=${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;
