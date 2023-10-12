const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = removeById;
