const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const getContactId = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: `Contact with id=${contactId} found`,
    data: {
      result,
    },
  });
};

module.exports = getContactId;
