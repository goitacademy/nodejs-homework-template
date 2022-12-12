const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

async function getContactById(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = getContactById;
