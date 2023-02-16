const contactsService = require('../services/contactsService');
const JoiSchema = require('../schemas/contactsSchema');

const get = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;
    const filters = { owner: _id, favorite };

    const contacts = await contactsService.listContacts({
      filters,
      skip,
      limit,
    });
    res.json({ contacts });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { _id } = await req.user;
    const { id } = await req.params;
    const contact = await contactsService.getContactById({
      userId: _id,
      contactId: id,
    });

    if (contact) {
      return res.json({ contact });
    }
    res.status(404).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { _id } = await req.user;
    let { name, email, phone, favorite } = await req.body;
    if (!favorite) {
      favorite = false;
    }

    const isValid = JoiSchema.allRequired.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (isValid.error) {
      return res.status(400).json({
        message: isValid.error.details[0].message,
      });
    }

    const contact = await contactsService.addContact({
      name,
      email,
      phone,
      favorite,
      owner: _id,
    });
    res.status(201).json({ contact });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const isDelete = await contactsService.removeContact({
      userId: _id,
      contactId: id,
    });
    if (!isDelete) {
      return res.status(404).json();
    }

    res.json({
      Status: 'contact deleted',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    const isValid = JoiSchema.atLeastOne.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (isValid.error) {
      return res.status(400).json({
        message: isValid.error.details[0].message,
      });
    }

    const newContact = JSON.parse(JSON.stringify(isValid.value));
    const contact = await contactsService.updateContact({
      userId: _id,
      contactId: id,
      body: newContact,
    });
    if (contact) {
      res.json({ contact });
      return;
    }

    res.status(404).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { favorite } = req.body;

    const isValid = JoiSchema.atLeastOne.validate({
      favorite,
    });
    if (isValid.error) {
      res.status(400).json({
        message: isValid.error.details[0].message,
      });
      return;
    }

    const contact = await contactsService.updateStatusContact({
      userId: _id,
      contactId: id,
      body: JSON.parse(JSON.stringify(isValid.value)),
    });
    if (contact) {
      res.json({ contact });
      return;
    }

    res.status(404).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  get,
  getById,
  create,
  removeById,
  update,
  updateStatus,
};
