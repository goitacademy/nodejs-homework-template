const { operations } = require("../../model/contacts");
const { NotFound } = require("http-errors");

const updateContactById = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    if (!body) {
      return NotFound(`Missing fields`);
    }
    const { contactId } = req.params;
    const upContact = await operations.updateContactById(contactId, body);
    if (!upContact) {
      return NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        upContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
