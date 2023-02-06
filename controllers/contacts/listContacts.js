const Contact = require("../../models/contactsModel");

const listContacts = async (req, res) => {
  const id = req.user.id;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  try {
    if (favorite) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          result: await Contact.find({ owner: id, favorite }, "", {
            skip,
            limit: Number(limit),
          }),
        },
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: await Contact.find({ owner: id }, "", {
          skip,
          limit: Number(limit),
        }),
      },
    });
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message });
  }
};

module.exports = listContacts;
