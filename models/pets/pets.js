const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for notice'],
    },
    date: {
      type: Date,
      required: [true, 'Set date for notice'],
    },
    type: {
      type: String,
      required: [true, 'Set type for notice'], 
    },
    comments: {
      type: String,
      default:''
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
     fileURL: String
  },
    {
      timestamps: true,
      versionKey: false
  }
);

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
