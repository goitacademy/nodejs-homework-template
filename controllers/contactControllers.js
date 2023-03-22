const Contact = require("../db/schemaContact");

exports.getContacts = async (req, res) => {
  const contacts = await Contact.find({});

  res.status(200).json(contacts);
};

exports.addContact = async (req, res) => {
  try {
    const contacts = await Contact.create(req.body);

    res.status(201).json(contacts);
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndRemove(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    console.error(err);
  }
};

exports.getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contacts = await Contact.findById(contactId);

    res.status(200).json(contacts);
  } catch (err) {
    res.status(404).json({
      msg: err.msg,
    });
  }
};

exports.updateContactById = async (req, res, next) => {
  try {
    if (JSON.stringify(req.body) === "{}") {
      return res.status(404).json({ message: "Missing fields" });
    }
    const { contactId } = req.params;

    const newContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: req.body,
      },
      { returnDocument: "after" }
    );

    if (!newContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(newContact);
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

exports.updateStatusContact = async (req, res) => {
  try {
    if (JSON.stringify(req.body) === "{}") {
      return res.status(404).json({ message: "Missing fields" });
    }
    const { contactId } = req.params;
    const { favorite } = req.body;

    const newFavorite = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: { favorite },
      },
      { returnDocument: "after" }
    );

    res.status(200).json(newFavorite);
  } catch (err) {
    return res.status(404).json({ message: "Not found" });
  }
};
