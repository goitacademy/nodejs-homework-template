const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contsct = await Contact.findById(contactId);
  if (!contsct) {
    const error = new Error(`Not found ${contactId}`);
    error.status = 404;
    throw error;
  }
  res.json({ status: "success", code: 200, data: { result: contsct } });
};

module.exports = getContactById;
