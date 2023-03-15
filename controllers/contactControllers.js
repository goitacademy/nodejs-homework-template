const { Contact } = require("../schemas/schemas");
const { NotFound } = require("http-errors");

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({});
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw new NotFound(`Contacts with id: ${contactId} wasn't found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw new NotFound(`Contacts with id: ${contactId} wasn't found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId);
    if (!result) {
      throw new NotFound(`Contacts with id: ${contactId} wasn't found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!result) {
      throw new NotFound(`Contacts with id: ${contactId} wasn't found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      date: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
  getContacts,
  getContactById,
  deleteContactById,
  updateContactById,
  updateStatusById,
};
