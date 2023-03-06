const service = require("../service/index");

const getContById = async (req, res, next) => {
  const contactId = req.params.id;
  console.log("ID=", contactId);
  res.send("Это роутер контакта c ID=" + contactId);
  try {
    const contactById = await service.getContById(contactId);
    console.log(contactById);
    if (contactById) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contactById,
        },
      });
    } else {
      console.log("Contact not found");
      res.status(404).json({
        message: `Not found contact with id ${contactId}`,
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getContById;
