const Contact = require('../service/schemas/task');


async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();

    res.send(contacts);
  } catch (err) {
    next(err);
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id).exec();

    if (contact === null) {
      return res.status(404).send("Contact not found:(");
    }

    res.send(contact);
  } catch (err) {
    next(err);
  }
}

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite || false,
  };

  try {
    const result = await Contact.create(contact);
    console.log(result);

    res.status(201).send(result);
  } catch (err) {
    console.error("Error creating a contact:", err);
    next(err);
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite || false,
  };

  try {
    const result = await Contact.findByIdAndUpdate(id, contact, { new: true });

    if (result === null) {
      return res.status(404).send("Contact not found");
    }

    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).send("Contact not found");
    }

    res.send({ id });
  } catch (err) {
    next(err);
  }
}

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
  
    // Перевірка, чи вказане поле favorite в запиті
    if (favorite === undefined) {
      return res.status(400).json({ message: 'missing field favorite' });
    }
  
    try {
      // Оновлення статусу контакту в базі даних
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { favorite },
        { new: true }
      );
  
      // Перевірка, чи контакт був знайдений та оновлений
      if (!updatedContact) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      // Відправлення оновленого контакту та статусу 200
      res.json(updatedContact);
    } catch (error) {
      // Обробка помилок та пересилання їх до middleware для подальшого оброблення
      next(error);
    }
  };

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,

};
