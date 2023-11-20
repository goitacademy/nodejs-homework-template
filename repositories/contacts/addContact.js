import { nanoid } from "nanoid";
import { readDataFromFile } from "../../services/readDataFromFile.js";
import { findByKeyValue } from "../../services/findByKeyValue.js";
import { writeDataToFile } from "../../services/writeDataToFile.js";
import { listContacts } from "./listContacts.js";

export async function addContact(name, email, phone) {
  const contacts = await readDataFromFile();
  const propertiesToCheck = [
    { name: "name", value: name },
    { name: "email", value: email },
    { name: "phone", value: phone },
  ];

  for (let property of propertiesToCheck) {
    if (findByKeyValue(contacts, property.name, property.value)) {
      console.log(`Contact with name: ${name} is already in the database.`);
      return;
    }
  }

  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await writeDataToFile(contacts);
  listContacts();
}
