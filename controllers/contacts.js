// в папке controllers (принимает запросы, формирует и отдает ответы, пробрасывает данные) хранятся controllers и бизнес-логика. По-хорошему бизнес-логика должна быть прописана в папке  service (например, загрузка картинок)
const Contacts = require("../repositories/contacts");

const listContacts = async (req, res, next) => {
  try {
    // console.log(req.user); // получение user. Везде где будет quard - будет получен доступ к  нему

    const useriId = req.user.id; // достаем сперва id, чтобы отображалась только те данные, которые принадлежат пользователю

    const { docs: contacts, ...rest } = await Contacts.listContacts(
      useriId,
      req.query
    );

    return res.json({
      status: "success",
      code: 200,
      data: { contacts, ...rest },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const useriId = req.user.id; // достаем сперва id, чтобы отображалась только те данные, которые принадлежат пользователю

    const contact = await Contacts.getContactById(
      useriId,
      req.params.contactId
    );

    if (contact) {
      console.log(contact);
      console.log(contact.info);
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }

    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const useriId = req.user.id; // достаем сперва id, чтобы отображалась только те данные, которые принадлежат пользователю

    const contact = await Contacts.addContact(useriId, req.body);

    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const useriId = req.user.id; // достаем сперва id, чтобы пользователь мог удалять только те данные, которые принадлежат ему

    const contact = await Contacts.removeContact(useriId, req.params.contactId);

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
        message: "Contact deleted",
      });
    }

    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const useriId = req.user.id; // достаем сперва id, чтобы пользователь мог обновлять только те данные, которые принадлежат ему

    const contact = await Contacts.updateContact(
      useriId,
      req.params.contactId,
      req.body
    );

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
      });
    }

    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
