const chalk = require("chalk");
const app = require("../app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server running. Use our API on port: ${PORT}`));
});
