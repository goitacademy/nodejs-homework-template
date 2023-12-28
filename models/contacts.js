const crypto = require("node:crypto");//встроенный пакет вместо nanoid
const fs = require("node:fs/promises");
const path = require("node:path");

const contactsPath = path.join(__dirname,  "contacts.json"); 

console.log('__dirname', __dirname); // Вывод информации о текущей папке
console.log('__filename', __filename); // Вывод информации о текущем файле

//JSON.stringify преобразует объект contacts в строку JSON с отступами (2 пробела), делая данные более читаемыми при записи в файл.
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const listContacts = async () => {  
  const data = await fs.readFile(contactsPath, {encoding: "utf-8"}); //или можно без encoding таким образом const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

const getContactById = async (contactId) =>  {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}

const deleteContact = async (contactId) => {   
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
      return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;}

const addContact = async (body) => {    
  const contacts = await listContacts();    
  const newContact = {
      id: crypto.randomUUID(), //вместо nanoid используем встроенный в ноду модуль
      name: body.name,
      email: body.email,
      phone: body.phone
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  }

const updateContact = async (contactId, updatedContact) => {  
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const originalContact = contacts[index];  
  const newContact = { ...originalContact, ...updatedContact };
  contacts[index] = newContact;  
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
}




//   # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id - выводим в консоль объект контакта или null, если контакта с таким id не существует.
// node index.js --action get --id 05olLMgyVQdWRwgKfg5J6

// # Добавляем контакт и выводим в консоль созданный контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт и выводим в консоль удаленный контакт или null, если контакта с таким id не существует.
// node index.js --action remove --id qdggE76Jtbfd9eWJHrssH


// # Обновляем существующий контакт и выводим его в консоль. 
// !ЭТО ИДЕНТИЧНЫЕ ЗАПИСИ  ПРОСТО ОДНА КОРОТКАЯ А ДРУГАЯ ДЛИННАЯ:
// node index.js --action=update --id=rsKkOQUi80UsgVPCcLZZW --name=Marishka --email=Marishka@gmail.com --phone=0937635489
// node index.js -a update -i rsKkOQUi80UsgVPCcLZZW -n Marishka -e Marishka@gmail.com -p 0937635489