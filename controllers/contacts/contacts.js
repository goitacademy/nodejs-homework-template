const { BadRequest, NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite, name } = req.query;
  const skip = (page - 1) * limit;

  if (favorite && name) {
    const contacts = await Contact.find(
      { owner: _id, favorite, name: { $regex: `${name}` } },
      "",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "_id name email");
    if (contacts.length === 0) {
      throw new NotFound(`Contact ${name} not found`);
    } else {
      res.json(contacts);
    }
  } else if (favorite) {
    const contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    if (contacts.length === 0) {
      throw new NotFound();
    } else {
      res.json(contacts);
    }
  } else if (name) {
    const contacts = await Contact.find(
      { owner: _id, name: { $regex: `${name}` } },
      "",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "_id name email");
    if (contacts.length === 0) {
      throw new NotFound(`Contact ${name} not found`);
    } else {
      res.json(contacts);
    }
  } else {
    const contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    if (contacts.length === 0) {
      throw new NotFound();
    } else {
      res.json(contacts);
    }
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`);
  } else if (_id.toString() !== contact.owner.toString()) {
    throw new BadRequest(`Wrong current user`);
  } else res.json(contact);
};

const add = async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`);
  } else if (_id.toString() !== contact.owner.toString()) {
    throw new BadRequest(`Wrong current user`);
  } else {
    const updatedContact = await Contact.findOneAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedContact);
  }
};

const updateStatusById = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`);
  } else if (_id.toString() !== contact.owner.toString()) {
    throw new BadRequest(`Wrong current user`);
  } else {
    if (!favorite) {
      throw new BadRequest("missing field favorite");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
      }
    );
    res.json(updatedContact);
  }
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`);
  } else if (_id.toString() !== contact.owner.toString()) {
    throw new BadRequest(`Wrong current user`);
  } else {
    const deletedContact = await Contact.deleteOne({ _id: id });
    res.json(deletedContact);
  }
};

module.exports = {
  add,
  updateById,
  updateStatusById,
  getAll,
  getById,
  removeById,
};
