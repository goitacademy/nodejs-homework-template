const { Contact } = require("../../service/schemasContacts");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    res.status(404).json({
      status: "error",
      message: `Not found contact id: ${contactId}`,
    });
  } else {
    res.json({
      status: "success",
      code: 200,
      data: { contact: result },
    });
  }
};
module.exports = getById;
