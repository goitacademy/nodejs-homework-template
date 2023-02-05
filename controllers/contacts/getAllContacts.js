const Contact = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, "name phone email favorite");
    return res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllContacts;