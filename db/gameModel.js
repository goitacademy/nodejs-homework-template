const mongoose = require("mongoose");

const gameShema = new mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

const Game = mongoose.model("games", gameShema);

module.exports = {
  Game,
};
