const { Contact } = require("../schemas/contacts");

const getAll = async (req, res) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAll;
