const { Contact } = require("../../model/contacts");

const changeContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      body,
      { new: true }
    );
    if (updatedContact) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: updatedContact,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact ${contactId} can not be deleted `,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }
};

module.exports = changeContact;
