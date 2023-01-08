const server = require("../../services/contacts");
const postContact = async (req, res) => {
  try {
    const { name, email, phone, favorite = false } = req.body;
    await server.addContact(name, email, phone, favorite);
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  postContact,
};
