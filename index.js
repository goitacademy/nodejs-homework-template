const contactsService = require("./services/contactsService");
const { Command } = require("commander");
const program = new Command();

program.name('contact').description('App for saving contacts').version('1.0.0');

program
  .command('get-contact')
  .description('Get one or many contacts')
  .option('-i, --id <id>', "contact's id")
  .action(async ({ id }) => {
    if (!id) {
      const contacts = await contactsService.getAll();
      console.log('Contacts were found', contacts);
    } else {
      const contact = await contactsService.getOneById(id);
      console.log('Contact was found', contact);
    }
  });

  program
  .command('create-contact')
  .description('Create contact')
  .argument('<payload>')
  .action(async (payload) => {
    const contact = await contactsService.add(JSON.parse(payload));
    console.log('Contact was created', contact);
  });

  program
  .command('update-contact')
  .description('Update contact by id')
  .argument('<payload>')
  .requiredOption('-i, --id <id>', "contact's id")
  .action((payload, options) => {
    console.log('update contact', payload, options);
  });

program.parse(process.argv);