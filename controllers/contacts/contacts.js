const { NotFound, BadRequest } = require("http-errors");
const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite, name, email } = req.query;
  const skip = (page - 1) * limit;
  const filters = { owner: _id };

  if (favorite) filters.favorite = favorite;
  if (name) filters.name = name;
  if (email) filters.email = email;

  if (filters.name || filters.favorite || filters.email) {
    const contacts = await Contact.find(filters, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    if (contacts.length === 0) {
      throw new NotFound(`Contact not found`);
    } else {
      res.json(contacts);
    }
  } else {
    const contacts = await Contact.find(
      { owner: _id },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "_id name email");
    if (contacts.length === 0) {
      throw new NotFound(`Contact list empty`);
    } else {
      res.json(contacts);
    }
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const findContact = await Contact.findOne({ _id: id, owner: _id });
  if (!findContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  } else res.json(findContact);
};

const add = async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: _id },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json(updatedContact);
};

const updateStatusById = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    throw new BadRequest(`Field favorite is required`);
  }
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: _id },
    { favorite },
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json(updatedContact);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const deletedContact = await Contact.findOneAndRemove({
    _id: id,
    owner: _id,
  });
  if (!deletedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json(deletedContact);
};

module.exports = {
  add,
  updateById,
  updateStatusById,
  getAll,
  getById,
  removeById,
};
