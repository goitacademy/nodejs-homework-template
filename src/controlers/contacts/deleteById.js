const server = require("../../models/contacts");

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await server.getContactById(contactId);
    await server.removeContact(contactId);
    if (!contact) {
      return res
        .status(400)
        .json({ message: `failure, no contact with id= ${contactId} found` });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteById,
};
