const Contacts = require("../repository/contacts");
const CustomError = require("../helpers/customError");

const getContacts = async (req, res, next) => {
  // console.log(req.method);
  console.log(req.query);

  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res.json({ status: "success", cod: 200, data: { ...data } });
  // единственно возможная ошибка это изменить раут - 404 в app.js
};

const getContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  // console.log(req.params);

  console.log(contact);
  // console.log(contact.id);

  if (contact && contact !== null) {
    return res
      .status(200)
      .json({ status: "success", cod: 200, data: { contact } });
  }
  // CustomError теперь срабатывает, если заменить символ в id на другой - попадаем в app.js status(500)
  // если изменить раут - 404 в app.js
  // если удалить или добавить символ в id - ValidationError
  throw new CustomError(404, "getContact Not found");
};

const createContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res.status(201).json({ status: "success", cod: 201, data: { contact } });
  // если изменить раут - 404 в app.js
  // если сделать ошибку в боди - ValidationError
};

const deleteContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);
  if (contact) {
    return res.status(200).json({
      status: "success",
      cod: 200,
      message: "contact deleted",
      data: { contact },
    });
  }
  // если заменить символ в id на другой - попадаем в wrapError срабатывает CustomError
  // если изменить раут - 404 в app.js
  // если удалить или добавить символ в id - ValidationError
  throw new CustomError(404, "deleteContact Not found");
};

const updateContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", cod: 200, data: { contact } });
  }

  // если заменить символ в id на другой - попадаем в wrapError срабатывает CustomError
  // если изменить раут - 404 в app.js
  // если удалить или добавить символ в id или сделать ошибку в боди- ValidationError
  throw new CustomError(404, "updateContact Not found");
};

const updateStatusFavoriteContact = async (req, res, next) => {
  const { favorite } = req.body;
  const userId = req.user._id;
  // const contact = await Contacts.updateContact(req.params.contactId, {
  //   favorite,
  // });
  const contact = await Contacts.updateContact(
    req.params.contactId,
    { favorite },
    userId
  );
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", cod: 200, data: { contact } });
  }
  // если заменить символ в id на другой - попадаем в wrapError срабатывает CustomError
  // если изменить раут - 404 в app.js
  // если удалить или добавить символ в id или сделать ошибку в боди- ValidationError
  throw new CustomError(404, "updateStatusFavoriteContact Not Found");
};
module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusFavoriteContact,
};
