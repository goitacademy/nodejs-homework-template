const { Contact } = require("../../service/schemasContacts");
const RequestError = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, `Not found contact id: ${contactId}`);
  } else {
    res.json({
      status: "success",
      code: 200,
      data: { contact: result },
    });
  }
};
module.exports = getById;
