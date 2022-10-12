const chalk = require('chalk');

const app = require('./app');


app.listen(3000, () => {
  console.log(chalk.blue.bgYellow.bold.italic("Server running. Use our API on port: 3000"))
})
