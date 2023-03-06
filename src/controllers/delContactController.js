const service = require("../service/index");
require("colors");

const delContact = async (req, res, next) => {
  const contactId = req.params.id;
  // if (!contactId) {
  //   return () => {
  //     res.status(400).json({
  //       message: "Contact Not found",
  //       status: 404,
  //     });
  //   };
  // } else {
  try {
    const contacts = await service.removeCont(contactId);
    return res.status(200).json({
      message: "contact deleted",
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.log(error.red.bold.italic);
    next();
  }
};
// };

module.exports = delContact;
