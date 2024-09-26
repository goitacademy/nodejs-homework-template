const { Contact } = require("../schemas/contacts");
const { RequestError } = require("../helpers");

const updateFavorite = async (req, res) => {
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
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateFavorite;
