const Contact = require("../../models/contactsModel");

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  try {
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: Contact.findOne({ _id: contactId }),
      },
    });
  } catch (error) {
    res.status(404).json({ code: 404, message: "Not found" });
  }
};

module.exports = getContactById;
