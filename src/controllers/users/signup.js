// const { User } = require("../../schemas/user");

async function signup(req, res, next) {
  // const id = req.params.contactId;
  // const contact = await User.findById(id);

  // if (contact) {
  //   return res.status(200).json(contact);
  // }
  // return res.status(404).json({ message: "Not found" });

  return res.status(503).json({ message: "signup not work" });
}

module.exports = signup;
