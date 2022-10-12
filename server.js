const app = require("./app");
const chalk = require("chalk");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) return console.error(error.message);

  console.log(chalk.cyan.underline(`http://localhost:${PORT}`));
  console.log(`Server running. Use our API on port: ${PORT}`);
});
