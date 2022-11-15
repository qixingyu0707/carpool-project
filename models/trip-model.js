const mongoose = require("mongoose");
const { Schema } = mongoose;

const tripSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId, //objectID是mongoose给的 ref是指会连接到User那里
    ref: "User",
  },
  passengers: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Trip", tripSchema);
