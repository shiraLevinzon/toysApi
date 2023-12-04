const mongoose = require("mongoose");


const toySchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    img_url: {
        type: String,
        required: false
    },
    created_date:{
        type: Date,
        required: false
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

toySchema.pre("save", function (next) {
    this.date_created=Date.now();
    next();
});
const Toy = mongoose.model("Toy", toySchema);
module.exports.Toy=Toy;