const { Contact } = require("../../models");
const createError = require("http-errors");

const getAll = async (req, res, next) => {
  try {
    const allContacts = await Contact.find({});
    if (!allContacts) {
      throw createError(404, `No contacts, please try later.`);
    }
    res.json({
      status: "Success",
      code: 200,
      data: {
        result: allContacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
