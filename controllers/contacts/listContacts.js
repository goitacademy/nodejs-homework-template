const { Contact } = require("../../models/contact");

const listContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find({}, "-createdAt -updatedAt");
    res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;