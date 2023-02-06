const Contact = require("../../models/contactsModel");

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const id = req.user.id;
  try {
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: Contact.findOne({ _id: contactId, owner: id }),
      },
    });
  } catch (error) {
    res.status(404).json({ code: 404, message: "Not found" });
  }
};

module.exports = getContactById;
