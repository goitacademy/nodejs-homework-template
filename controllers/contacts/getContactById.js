const contactOperation = require("../../models/contacts");
const { NotFound } = require("http-errors");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactOperation.getContactById(contactId);

  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};
module.exports = getContactById;
