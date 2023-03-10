const service = require("../../service/index");
require("colors");

const delContact = async (req, res, next) => {
  const contactId = req.params.id;
  console.log(contactId);
  if (!contactId) {
    return () => {
      res.status(400).json({
        message: "Contact Not found",
        status: 404,
      });
    };
  } else {
    try {
      const deletedContact = await service.removeCont(contactId);
      return res.status(200).json({
        message: "contact deleted",
        status: "success",
        code: 200,
        data: {
          deletedContact,
        },
      });
    } catch (error) {
      console.log(error.message.red.italic);
      next();
    }
  }
};

module.exports = delContact;
