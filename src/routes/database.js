const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const itemSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  semester: { type: Number, required: true },
  material: { type: String, required: true },
});

const uploadSchema = new mongoose.Schema({
  // Add any other fields as needed
  name: { type: String, required: true },
  items: [itemSchema],
});

const upload = mongoose.model('upload', uploadSchema);

module.exports = { upload };