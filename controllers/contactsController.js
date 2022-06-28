let contacts = [
  {
    id: "1",
    name: "Rosie Simpson",
    email: "test@mail.com",
    phone: "4591256",
  },
  {
    id: "2",
    name: "Hermione Kline",
    email: "test@mail.com",
    phone: "4438912",
  },
  {
    id: "3",
    name: "Eden Clements",
    email: "test@mail.com",
    phone: "6451779",
  },
  {
    id: "4",
    name: "Annie Copeland",
    email: "test@mail.com",
    phone: "2279126",
  },
];

const listContacts = (req, res) => {
  console.log(res);
  res.json({ contacts, status: "Success" });
};

const getById = (req, res) => {
  const contact = contacts.find((item) => item.id === req.params.contactId);
  res.json({ contact, status: "Success" });

  if (!contact) {
    res.status(400).json({
      status: `Failure, we didn't find the contact width id=${req.params.contactId}`,
    });
  }
};

const addContact = (req, res) => {
  const { name, email, phone } = req.body;
  contacts.push({ id: new Date().getTime().toString(), name, email, phone });
  res.json({ status: "Success" });
};

const removeContact = (req, res) => {
  contacts = contacts.filter((contact) => req.params.contactId !== contact.id);
  res.json({ status: "Success" });
};

const updateContact = (req, res) => {
  const { name, email, phone } = req.body;
  contacts.forEach((contact) => {
    if (Number(contact.id) === Number(req.params.contactId)) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });
  res.json({ status: "Success" });
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
