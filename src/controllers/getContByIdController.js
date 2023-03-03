const contactOperations = require("../models/contacts");

const { getContactById } = contactOperations;

const getContById = async (req, res, next) => {
  const contactId = req.params.id;
  console.log("ID=", contactId);
  res.send("Это роутер контакта c ID=" + contactId);
  if (!contactId) {
    return () => {
      console.log("Contact not found");
      res.status(404).json({
        message: "Not found",
        status: 404,
      });
    };
  } else {
    const contactById = await getContactById(contactId);
    console.log(contactById);
    return res.status(200).json({
      status: 200,
      data: {
        contactById,
      },
    });
  }
};

module.exports = getContById;
