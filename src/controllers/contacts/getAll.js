const { Contact } = require("../../models/contacts");

const getAll = async (_, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json({
      status: "success",
      code: 200,
      data: { result: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
