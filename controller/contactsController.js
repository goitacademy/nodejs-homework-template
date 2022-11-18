const service = require("../services/contactsServices");
const get = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const filterOptions = { owner: _id };

    const results = await service.listContacts(filterOptions);
    res.status(200).json(results);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const filterOptions = { _id: contactId, owner: _id };

  try {
    const result = await service.getContactById(filterOptions);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const body = req.body;
  const { _id } = req.user;
  const filterOptions = { ...body, owner: _id };

  try {
    const result = await service.addContact(filterOptions);

    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const body = req.body;
  const filterOptions = { owner: _id, _id: contactId };
  const update = { ...body };

  try {
    const result = await service.updateContact(filterOptions, update);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const filterOptions = { _id: contactId, owner: _id };
  try {
    const result = await service.removeContact(filterOptions);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const { favorite = false } = req.body;
  const filterOptions = { _id: contactId, owner: _id };

  try {
    const result = await service.updateContact(filterOptions, { favorite });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: `Not found`,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = {
  get,
  getById,
  create,
  update,
  updateStatusContact,
  remove,
};
