const { Contact } = require("../../models/contacts");
// const { Conflict } = require("http-errors");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = (page - 1) * limit;
  const options = { owner: _id, favorite: favorite };
  if (options.favorite === undefined) {
    delete options.favorite;
  }

  const data = await Contact.find(options, "", {
    skip,
    limit: Number(limit),
    favorite: true,
  }).populate("owner", "_id email");
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  res.json({ status: "success", code: 200, data });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndDelete(contactId);
  res.json({
    message: "contact successfully deleted",
    statusOperation: "success",
  });
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  if (!req.body.favorite) req.body.favorite = false;
  // const contact = await Contact.findOne(req.email);
  // console.log("contact", contact);
  // if (contact) {
  //   throw new Conflict("Contact already in data");
  // }
  const data = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data,
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json({
    message: "contact successfully edit",
    statusOperation: "success",
    data,
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined)
    res.status(400).json({ message: "missing field favorite" });
  const data = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  res.json({
    message: "contact successfully edit",
    statusOperation: "success",
    data,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
