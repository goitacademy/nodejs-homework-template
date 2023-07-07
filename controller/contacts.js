const service = require("../service/index");

const get = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const results = await service.getAllContacts(userId);
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  try {
    const result = await service.getContactById(contactId, userId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact found",
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const create = async (req, res, next) => {
  const userId = req.user._id;
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await service.createContact({
      name,
      email,
      phone,
      favorite,
      owner: userId,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact created",
      data: { contact: result },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const userId = req.user._id;
  try {
    const result = await service.updateContact(contactId, userId, {
      name,
      email,
      phone,
      favorite,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact updated",
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const userId = req.user._id;
  if (favorite === undefined) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing field favorite",
    });
  }
  try {
    const result = await service.updateStatusContact(contactId, userId, {
      favorite,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "Status changed",
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  try {
    const result = await service.removeContact(contactId, userId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact deleted",
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
