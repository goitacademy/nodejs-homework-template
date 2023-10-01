const { Contact } = require("../schemas/contacts");
const { RequestError } = require("../helpers");

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getById;
