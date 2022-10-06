const { NotFound } = require("http-errors");

const { contactById } = require("../../models/contacts");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactById(contactId);

  if (!result) {
    throw new NotFound(`Not found id=${contactId}`);
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
