const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  console.log("result", result);

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
