const { Command } = require("commander");
const app = require("./app");

const program = new Command();

const PORT = 3000;

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
