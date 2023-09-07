const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
    // below the object will have a name field with a datatype of a string, and the name and color is set to required true, so it requires those.
    // schema is describing what the document will look like. It is just a blueprint, not the actual data
    name: { type: String, required: true }, 
    color: { type: String, required: true }, 

    //  img:String is shorthand for img: {type:String}, only use img:String if not adding other args
    img: String,
    readyToEat: Boolean,
}, 
    {
    // now there will be a timestamp everytime it was created
    timestamps: true,
    }
);

// Model will perform all the CRUD functionality. A model needs the schema to be created first, model needs to look inside the schema.
// below is a model created for fruit with 2 arguments, fruit and the fruitSchema
const Fruit = mongoose.model("Fruit", fruitSchema);



module.exports = Fruit;