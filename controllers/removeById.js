const { Contact } = require("../schemas/contacts");
const { RequestError } = require("../helpers");

const removeById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = removeById;
