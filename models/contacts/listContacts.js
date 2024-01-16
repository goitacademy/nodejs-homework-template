import { readContacts } from "../../helpers/index.js";

export const listContacts = async () => {
  const contacts = await readContacts();

  if (!contacts) {
    throw new Error(`Not found`);
  }

  return contacts;
};
