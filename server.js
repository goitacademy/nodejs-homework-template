const app = require('./app')

const { lineBreak } = require("./service")


//----------------------------------------------------------------
const { PORT = 3000 } = process.env

//todo CONSPECT
// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

app.listen(PORT, (err) => {
  if (err) console.error("Error at server launch", err.message);
  console.log(`Server is running on the port: ${PORT}`.bgGreen.red);
  lineBreak();
});
