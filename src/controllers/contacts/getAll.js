const { Contact } = require("../../models/contacts");

const getAll = async (_, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt").lean();

    return res.json({
      status: "success",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
