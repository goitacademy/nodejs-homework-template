const Contact = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  console.log(result);
  if (!result) {
    throw new RequestError(404, `Contact with id - ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = getContactById;
