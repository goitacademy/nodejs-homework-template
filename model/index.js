const { Command } = require('commander')
const operations = require('./contacts.js')
const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      operations.listContacts().then((contacts) => console.table(contacts))
      break

    case 'get':
      operations.getContactById(id).then((contact) => console.table(contact))
      break

    case 'add':
      operations
        .addContact(name, email, phone)
        .then((result) => console.table(result))
      break

    case 'remove':
      operations.removeContact(id).then((result) => console.table(result))
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
