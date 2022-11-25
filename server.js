const app = require('./app')

const { lineBreak } = require("./service")


//----------------------------------------------------------------
const { PORT = 3000 } = process.env

app.listen(PORT, (err) => {
  if (err) console.error("Error at server launch", err.message);
  console.log(`Server is running on the port: ${PORT}`.bgGreen.red);
  lineBreak();
});
