const contacts = require("../../models/contacts");
const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = getAll;
