const service = require("../service/index");
const { validateContactCreation } = require("../utils/validation");

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await service.getSingleContact(contactId);
    if (contact) {
      return res.status(200).json(contact);
    }

    res.status(404).json({
      message: "Not found",
    });
  } catch (err) {
    next(err);
  }
};

const post = async (req, res, next) => {
  if (validateContactCreation(req.body).error) {
    return res.status(400).json({
      message: "Missing required name field",
    });
  }

  const contact = await service.createContact(req.body);
  res.status(201).json({
    message: "Contact was created",
    data: contact,
  });
};

const deleteOne = async (req, res, next) => {
  // const { contactId } = req.params;
  // const contact = await actions.removeContact(contactId);

  // if (contact) {
  //   return res.status(200).json({
  //     message: "Contact deleted",
  //   });
  // }

  // res.status(404).json({
  //   message: "Not found",
  // });
};

const putOne = async (req, res, next) => {
  // const { contactId } = req.params;
  // const contact = await actions.updateContact(contactId, req.body);

  // switch (contact) {
  //   case "not-found":
  //     res.status(404).json({
  //       message: "Not found",
  //     });
  //     break;

  //   case "bad-request":
  //     res.status(400).json({
  //       message: "Missing fields",
  //     });
  //     break;

  //   default:
  //     res.status(200).json({
  //       data: { contact },
  //     });
  //     break;
  // }
};

const patchFavorite = async (req, res, next) => {

};

module.exports = {
  get,
  getOne,
  post,
  deleteOne,
  putOne,
  patchFavorite,
};
