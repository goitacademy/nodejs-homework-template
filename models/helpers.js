const fs = require("fs/promises");
const { readFile, writeFile } = fs;

function Parcer(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function fileReader(path) {
  const data = await readFile(path).catch((e) => console.log(e.message));
  return data;
}
async function fileWriter(path, payload) {
  const data = await writeFile(path, payload).catch((e) =>
    console.log(e.message)
  );
  return data;
}

async function handleContactUpdate(request, contactsPath, newData) {
  const { contactId } = request.params;

  const data = await fileReader(contactsPath);
  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (!contactFound) return null;

  const filteredArr = Parcer(data).filter((item) => item.id !== contactId);

  const updatedContact = {
    ...contactFound,
    ...newData,
  };

  const updatedArr = [...filteredArr, updatedContact];

  await fileWriter(contactsPath, JSON.stringify(updatedArr));

  return updatedContact;
}

module.exports = {
  Parcer,
  fileReader,
  fileWriter,
  handleContactUpdate,
};
