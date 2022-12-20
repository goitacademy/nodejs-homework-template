const server = require("../../models/contacts");

const getListById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await server.getContactById(contactId);
    if (!contact) {
      return res
        .status(400)
        .json({ message: `failure, no contact with id= ${contactId} found` });
    }
    res.json({ contact, message: "success" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getListById,
};
