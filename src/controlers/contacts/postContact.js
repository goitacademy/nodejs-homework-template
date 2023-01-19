const server = require("../../services/contacts");
const postContact = async (req, res) => {
  try {
    const { name, email, phone, favorite = false } = req.body;
    const { _id: userId } = req.user;
    await server.addContact({ name, email, phone, favorite }, userId);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "validation error", error });
  }
};
module.exports = {
  postContact,
};
