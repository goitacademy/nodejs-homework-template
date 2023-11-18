export function noFound(req, res) {
  res.status(404).json({ message: "Not found" });
}
