const createContact = require('../../service/contacts/createContact.js');

const create = async (req, res, next) => {
  const { body } = req;
  try {
    const contact = await createContact(body);
    console.log(
      `Contact with id: ${contact.id} has been successfully added to the contact database.`
    );
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact was added to database",
      data: {
        contact,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {create};