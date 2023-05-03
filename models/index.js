// const { program } = require("commander");
// const contactsFunctions = require("./contacts.js");

// const invokeAction = async ({ action, id, name, email, phone }) => {
//     switch (action) {
//       case "list":
//         {const allContacts = await contactsFunctions.listContacts();
//         return console.log(allContacts)};
  
//       case "get":
//         {const oneContact = await contactsFunctions.getContactById(id);
//         return console.log(oneContact)};
  
//       case "add":
//         {const newContact = await contactsFunctions.addContact({
//           name,
//           email,
//           phone,
//         });
//         return console.log(newContact)};
       
//         case "updateById":
//       {const updateContact = await contactsFunctions.updateContact(id, {
//         name,
//         email,
//         phone,
//       });
//       return console.log(updateContact)};
  
//       case "remove":
//         {const deleteContact = await contactsFunctions.removeContact(id);
//         return console.log(deleteContact)};
  
//       default:
//         console.warn("\x1B[31m Unknown action type!");
//     }
//   };

// program
//   .option("-a, --action <type>", "choose action")
//   .option("-i, --id <type>", "user id")
//   .option("-n, --name <type>", "user name")
//   .option("-e, --email <type>", "user email")
//   .option("-p, --phone <type>", "user phone");

// program.parse(process.argv);

// const options = program.opts();
// invokeAction(options);
