const app = require("./app");
const contactsRouter = require("./routes/api/contacts");

app.use("/api/contacts", contactsRouter);

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
