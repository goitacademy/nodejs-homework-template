const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = getById;
