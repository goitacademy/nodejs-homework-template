const server = require("../../services/contacts");

const deleteById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const contact = await server.getContactById(contactId, userId);
    await server.removeContact(contactId);
    if (!contact) {
      return res
        .status(400)
        .json({ message: `failure, no contact with id= ${contactId} found` });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteById,
};
