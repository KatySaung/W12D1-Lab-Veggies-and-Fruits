const mongoose = require("mongoose");

 // Part 2 Vegetables
const vegetableSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    color: { type: String, required: true }, 
    img: String,
    readyToEat: Boolean,
}, 
{
    // now there will be a timestamp everytime it was created
    timestamps: true,
    }
);
const Vegetable = mongoose.model("Vegetable", vegetableSchema);

//   export Vegetable to database
  module.exports = Vegetable;