let contacts = [
  {
    id: 1,
    name: "name1",
    number: "number1",
  },
  {
    id: 2,
    name: "name2",
    number: "number2",
  },
  {
    id: 3,
    name: "name3",
    number: "number3",
  },
];

const getContacts = async (req, res) => {
  res.json({ contacts, status: "succes" });
};

const getContactById = async (req, res, next) => {
  const [contact] = contacts.filter((item) => item.id === req.params.id);
  if (!contact) {
    res
      .status(400)
      .json({ status: `failure, no user with id ${req.params.id}` });
  }

  res.json({ contact, message: "template message", status: "succes" });
};

const addContact = async (req, res, next) => {
  const { name, number } = req.body;
  contacts.push({ id: new Date().toString(), name, number });
  res.json({ message: "template message", status: "succes" });
};

const changeContact = async (req, res, next) => {
  const { name, number } = req.body;
  contacts.forEach((contact) => {
    if (contact.id === req.params.id) {
      contact.name = name;
      contact.number = number;
    }
  });
  res.json({ message: "template message", status: "succes" });
};

const patchContact = async (req, res, next) => {
  const { name, number } = req.body;

  contacts.forEach((contact) => {
    if (contact.id === req.params.id) {
      if (name) {
        contact.name = name;
      }
      if (number) {
        contact.number = number;
      }
    }
  });

  res.json({ status: "succes" });
};
const deleteContsct = async (req, res, next) => {
  contacts = contacts.filter((item) => item.id !== req.params.id);
  res.json({ message: "template message" });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContact,
  patchContact,
  deleteContsct,
};
