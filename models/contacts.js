const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vovichkyry:v0zcv0VpVgo59nKr@cluster0.gf7lsqq.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Перевірка статусу підключення до бази даних
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
  console.log('Database connection successful');
});

// Схема моделі для колекції contacts
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

// Модель для колекції contacts
const Contact = mongoose.model('contacts', contactSchema);

// Функція для додавання контакту
async function addContact(contact) {
  try {
    const newContact = new Contact(contact);
    await newContact.save();
    console.log('Contact added successfully');
  } catch (error) {
    console.error('Error adding contact:', error.message);
  }
}

// Функція для отримання всіх контактів
async function listContacts() {
  try {
    const contacts = await Contact.find();
    console.log('Contacts:', contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error.message);
  }
}

// Функція для отримання контакту за ідентифікатором
async function getById(id) {
  try {
    const contact = await Contact.findById(id);
    if (contact) {
      console.log('Contact:', contact);
    } else {
      console.log('Contact not found');
    }
  } catch (error) {
    console.error('Error retrieving contact:', error.message);
  }
}

// Функція для видалення контакту за ідентифікатором
async function removeContact(id) {
  try {
    const result = await Contact.findByIdAndDelete(id);
    if (result) {
      console.log('Contact deleted successfully');
    } else {
      console.log('Contact not found');
    }
  } catch (error) {
    console.error('Error deleting contact:', error.message);
  }
}

// Функція для оновлення контакту за ідентифікатором
async function updateContact(id, updatedContact) {
  try {
    const result = await Contact.findByIdAndUpdate(id, updatedContact, {
      new: true,
    });
    if (result) {
      console.log('Contact updated successfully');
      console.log('Updated Contact:', result);
    } else {
      console.log('Contact not found');
    }
  } catch (error) {
    console.error('Error updating contact:', error.message);
  }
}

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
