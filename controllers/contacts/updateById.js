const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = updateById;
