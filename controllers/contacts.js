const service = require("../service");

const get = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const contacts = await service.listContacts(_id);
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  try {
    const contact = await service.getContactById(contactId, _id);
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
  const owner = req.user._id;
  try {
    const result = await service.addContact({
      name,
      email,
      phone,
      favorite,
      owner,
    });
    res.status(201).json({ message: "Contact created!", contact: result });
  } catch (error) {
    next(error);
  }
};

const del = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  await service.removeContact(contactId, _id);
  res.status(204).json();
};

const put = async (req, res, next) => {
  const contactToUpdate = req.body;
  const { contactId } = req.params;
  const { _id } = req.user;
  try {
    const result = await service.updateContact(contactId, contactToUpdate, _id);
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
  const { _id } = req.user;
  try {
    if (favorite === undefined) {
      res.status(400).json({ message: "missing field favorite" });
    } else {
      const result = await service.updateStatusContact(
        contactId,
        { favorite },
        _id
      );
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
