const { NotFound } = require("http-errors");
const { getContactById } = require("../../model");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      throw new NotFound(`Product with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
