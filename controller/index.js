const service = require("../service");

const get = async (req, res, next) => {
  try {
    const result = await service.getAllContacts();
    res.status(200).json({
      data: {
        contacts: result,
      },
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const result = await service.getContactById(req.params.contactId);
    res.status(200).json({
      contacts: result,
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
  }
};

const postNewContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await service.postNewContact(name, email, phone, favorite);
    res.status(200).json({
      data: {
        contacts: result,
      },
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const result = await service.deleteContact(req.params.contactId);
    res.status(200).json({
      data: {
        contacts: result,
      },
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};
const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const id = req.params.contactId;
    const result = await service.updateContact(
      id,
      name,
      email,
      phone,
      favorite
    );
    res.status(200).json({
      data: {
        contacts: result,
      },
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};

const updateContactFavorite = async (req, res, next) => {
  const { favorite } = req.body;
  const id = req.params.contactId;

  try {
    const result = await service.updateContactFavorite(id, favorite);
    if (!result.acknowledged) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    res.status(200).json({
      data: {
        contacts: result,
      },
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
    next(e);
  }
};
const getAllFavorite = async(req, res, next)=>{
    try {
        const result = await service.getAllFavorite();
        res.status(200).json({
          data: {
            contacts: result,
          },
        });
      } catch (e) {
        res.status(404).json({ message: "Not found" });
        next(e);
      }
}

module.exports = {
  get,
  getContactById,
  postNewContact,
  deleteContact,
  updateContact,
  updateContactFavorite,
  getAllFavorite,
};
