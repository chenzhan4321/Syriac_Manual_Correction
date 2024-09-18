const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  text: String,
  partOfSpeech: String,
  gender: String,
  number: String,
  person: String,
  tense: String,
  stamm: String,
  status: String,
});

const paragraphSchema = new mongoose.Schema({
  text: String,
  words: [wordSchema],
});

module.exports = mongoose.model('Paragraph', paragraphSchema);