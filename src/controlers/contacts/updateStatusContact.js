const server = require("../../models/contacts");


const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      console.log("bye");
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await server.updateContact(contactId, req.body);
    res.json({ contact, message: "success" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  updateStatusContact,
};
