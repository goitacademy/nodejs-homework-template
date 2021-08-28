const { Contact } = require("../../models");

const add = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    if ("favorite" in newContact) {
      newContact.favorite = false;
    }
    res.status(201).json({
      newContact,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = add;
