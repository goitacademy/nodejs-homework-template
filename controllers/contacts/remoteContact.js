const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const remoteContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  console.log(result);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  } else {
    res.json({
      status: "success",
      code: 200,
      message: `contact with id=${contactId} deleted`,
      data: {
        result,
      },
    });
  }
};

module.exports = remoteContact;
