const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const allContacts = await Contact.find({});
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
