const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
