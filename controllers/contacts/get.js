const { Contact } = require("../../models");
const createError = require("http-errors");

const getAll = async (_, res, next) => {
  try {
    const allContacts = await Contact.find({}, "-createdAt -updatedAt");
    if (!allContacts.length) {
      throw createError(404, `No contacts, please try later.`);
    }
    res.json({
      status: "Success",
      code: 200,
      result: allContacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;

