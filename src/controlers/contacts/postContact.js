const server = require("../../models/contacts");
const postContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite = false } = req.body;
    await server.addContact(name, email, phone, favorite);
    res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postContact,
};
