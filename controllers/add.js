const { Contact } = require("../schemas/contacts");

const add = async (req, res) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = add;
