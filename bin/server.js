import app from "../app";

const PORT = process.env.PORT || 3031;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
