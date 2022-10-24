const { Contact } = require("../../models");

const getListContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = getListContacts;
