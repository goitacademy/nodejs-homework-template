const server = require("../../services/contacts");

const getListById = async (req, res) => {
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
    console.log(error);
  }
};
module.exports = {
  getListById,
};
