const server = require("../../services/contacts");

const updateStatusContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    if (Object.keys(req.body).length === 0) {
      console.log("bye");
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await server.updateContact(contactId, req.body, userId);
    res.json({ contact, message: "success" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  updateStatusContact,
};
