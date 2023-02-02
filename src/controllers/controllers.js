const Contact = require ("../models/contact.model");

const getContacts = async (_, res) => {
  const data = await Contact.find();
  res.status(200).json({ status: `Successfully!`, statusCode: 200, data });
};

const getContById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById (contactId);
  if (!data) {
    return res.status(404).json({
      message: `Contact with id: ${contactId} not found`,
      statusCode: 404,
      data 
    });
  }
  res.status(200).json({ code: 200, data });
};

const addCont = async (req, res) => {
  const body = req.body;
  const data = await Contact.create(body);
  res.status(201).json({
    status: `Contact added successfully!`,
    code: 201,
    data,
  });
};

const deleteCont = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndRemove(contactId);

  if (!data) {
    return res.status(404).json({
      message: `Contact with id ${contactId} not found!`,
      code: 404,
    });
  }

  res.status(200).json({
    message: "Contact deleted successfully!",
    code: 200,
    data,
  });
};

const updateCont = async (req, res) => {
  const { contactId } = req.params;
  const contact = req.body;

  const data = await Contact.findByIdAndUpdate(contactId, contact);

  if (!data) {
    return res.status(404).json({
      status: `Failure, no contact with id ${contactId} found!`,
      statusCode: 404,
    });
  }
  res.status(200).json({
    status: `Contact with id ${contactId} change successfully!`,
    statusCode: 200,
    data,
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const favorite = req.body;

  const data = await Contact.findByIdAndUpdate(contactId, favorite);

  if (!data) {
    return res.status(404).json({
      status: `Failure, no contact with id ${contactId} found!`,
      statusCode: 404,
    });
  }
  res.status(200).json({
    status: `Contact with id ${contactId} change successfully!`,
    statusCode: 200,
    data,
  });
};

module.exports = {
  getContacts,
  getContById,
  addCont,
  deleteCont,
  updateCont,
  updateFavorite,
};
