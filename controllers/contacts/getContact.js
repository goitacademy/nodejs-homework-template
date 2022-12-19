const { Contacts } = require("../../models/contacts");

const getContact = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const result = await Contacts.find({ owner: _id }).populate(
      "owner",
      "_id name email phone"
    );
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

module.exports = getContact;
