// const { listContacts } = require("../models/contacts");
const { Contacts } = require("../models/contacts");

const getContact = async (req, res, next) => {
  try {
    const result = await Contacts.find({});
    res.json({
      status: "succsses",
      code: 200,
      data: {
        result: result,
      },
      message: "200 succsses",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getContact };
