// const { getContactById } = require("../models/contacts");
const { Contacts } = require("../models/contacts");

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contacts.findById(id);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: `contact with id: ${result.id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getById };
