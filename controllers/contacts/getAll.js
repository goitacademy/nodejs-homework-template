const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const allContacts = await Contact.find({ owner: _id });
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
