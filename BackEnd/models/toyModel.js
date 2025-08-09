const mongoose = require("mongoose");

const ToySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true, 
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  }
});

const TOY_MODEL = mongoose.models.food || mongoose.model('toys', ToySchema);
module.exports = TOY_MODEL;
