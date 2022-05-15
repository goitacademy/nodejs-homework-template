const service = require("../service");

const get = async (req, res, next) => {
  try {
    const contacts = await service.listContacts();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await service.getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

const post = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await service.addContact({ name, email, phone, favorite });
    res.status(201).json({ message: "Contact created!", contact: result });
  } catch (error) {
    next(error);
  }
};

const del = async (req, res, next) => {
  const { contactId } = req.params;
  await service.removeContact(contactId);
  res.status(204).json();
};

const put = async (req, res, next) => {
  const contactToUpdate = req.body;
  const { contactId } = req.params;
  try {
    const result = await service.updateContact(contactId, contactToUpdate);
    if (!result) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.json({ message: "contact updated!", contact: result });
    }
  } catch (e) {
    next(e);
  }
};

const patchFavorite = async (req, res, next) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  try {
    if (favorite === undefined) {
      res.status(400).json({ message: "missing field favorite" });
    } else {
      const result = await service.updateStatusContact(contactId, { favorite });
      if (!result) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.json({
          message: `contact was patched to favorite = ${favorite}`,
          contact: result,
        });
      }
    }
  } catch (e) {
    next(e);
  }
};
module.exports = {
  get,
  getOne,
  post,
  del,
  put,
  patchFavorite,
};
