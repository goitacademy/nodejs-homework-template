import app from "./app.js";
const { PORT = 4000, DB_HOST } = process.env;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
